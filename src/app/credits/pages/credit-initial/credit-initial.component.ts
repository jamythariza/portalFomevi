import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConstants } from 'src/app/Core/Constants/apiConstants';
import swal from 'sweetalert2';
import {
  ConnectedGroupRequestDto,
  CreditLineResponseModel,
  UploadedDocument,
  UploadedDocumentRequerido,
} from '../../models/creditline-model';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { CreditlineService } from 'src/app/services/creditline.service';
import { CreditService } from '../../services/credit.service';
import { LoanCalculatorService } from '../../services/loan-calculator.service';
import { CreditsRequestDto } from '../../models/credit-form-model';
import { ExternalService } from 'src/app/services/external.services';
import { AsociadoInfo } from 'src/app/models/user.interface';

@Component({
  selector: 'app-credit-initial',
  templateUrl: './credit-initial.component.html',
  styleUrls: ['./credit-initial.component.css'],
})
export class CreditInitialComponent implements OnInit {
  creditForm!: FormGroup;
  documentoId!: string;
  step = 1;
  totalSteps = 4;
  validatedFirstStep: boolean = false;
  validatedSecondStep: boolean = false;
  validatedThirdStep: boolean = false;
  /************************* */
  isPatrimonioNegativo = false;
  selectedCreditLine: CreditLineResponseModel = {} as CreditLineResponseModel;
  selectedCategory: string = '';
  uploadedDocuments: { [key: string]: UploadedDocument } = {};
  datos: any[] = [];
  dataGroupParents: ConnectedGroupRequestDto = {} as ConnectedGroupRequestDto;
  fileBase64: string = '';
  payment!: string;
  documentId: string | null = null;
  simulatedQuote: boolean = false;
  allRequiredDocuments: UploadedDocumentRequerido[] = [];
  asociadoInfo!: AsociadoInfo;

  nextStep() {
    if (this.step < this.totalSteps) this.step++;
  }

  prevStep() {
    if (this.step > 1) this.step--;
  }

  progressWidth(): string {
    return `${(this.step / this.totalSteps) * 100}%`;
  }

  validateFirstStep(): void {
    const creditline = this.creditForm.get('creditline')?.value != null;
    const monto = this.creditForm.get('monto')?.valid;
    const cuota =
      this.creditForm.get('cuota')?.value != null &&
      this.creditForm.get('cuota')?.valid;
    const plazo =
      this.creditForm.get('plazo')?.value &&
      this.creditForm.get('plazo')?.valid;
    const email =
      this.creditForm.get('email')?.value &&
      this.creditForm.get('email')?.valid;
    const phone =
      this.creditForm.get('phone')?.value &&
      this.creditForm.get('phone')?.valid;

    this.validatedFirstStep = !!(
      creditline &&
      monto &&
      cuota &&
      plazo &&
      email &&
      phone
    );

    this.showQuote();
  }

  validateSecondStep(): void {
    const activo = this.creditForm.get('patrimonio')?.value !== null;
    const pasivo = this.creditForm.get('pasivo')?.value !== null;
    this.validatedSecondStep = !!(activo && pasivo);
  }

  validateThirdStep(): void {
    const invalidCheck = this.creditForm.get('invalidCheck')?.value === true;
    const missingDocs = this.validateUploadedDocuments();

    if (missingDocs > 0) {
      this.laoderService.hide();

      swal.fire({
        icon: 'warning',
        title: 'Advertencia...',
        text: `Te faltan ${missingDocs} documento(s) por cargar.`,
      });

      return;
    }

    this.validatedThirdStep = invalidCheck;
  }

  onRequiredDocumentsReceived(docs: {
    [key: string]: { name: string; required: boolean }[];
  }) {
    const categoria = this.selectedCreditLine.description;

    this.allRequiredDocuments = (docs[categoria] || []).map((doc) => ({
      name: doc.name,
      required: doc.required,
      file: null,
    }));
  }

  onAuthorizedData() {
    this.validateThirdStep();
  }

  constructor(
    private fb: FormBuilder,
    private creditlineService: CreditlineService,
    private creditService: CreditService,
    private routers: Router,
    private laoderService: LoaderService,
    private loanService: LoanCalculatorService,
    private route: ActivatedRoute,
    private externalService: ExternalService,
  ) {
    this.creditForm = this.fb.group({
      creditline: ['', Validators.required],
      monto: ['', [Validators.required]],
      cuota: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      activo: ['0', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      pasivo: ['0', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      patrimonio: ['0', [Validators.required]],
      plazo: [null, [Validators.required]],
      invalidCheck: [null, Validators.required],
      familiesCheck: [false, Validators.required],
      documentoFamiliar: ['', [Validators.pattern(/^[0-9]+$/)]],
      parents: [''],
      comments: [''],
      // documents: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.documentId = this.route.snapshot.paramMap.get('documentoId') ?? null;

    if (this.documentId == null) {
      swal
        .fire({
          icon: 'error',
          title: 'Oops...',
          text: ApiConstants.ALERT_ERROR_DOCUMENT,
        })
        .then(() => {
          this.routers.navigate(['/dashboard']);
        });
      return;
    }

    this.validateUserByDocument();

    this.creditlineService.getAll().subscribe((data) => {
      this.datos = data.content;
    });

    this.creditForm
      .get('activo')
      ?.valueChanges.subscribe(() => this.actualizarPatrimonio());
    this.creditForm
      .get('pasivo')
      ?.valueChanges.subscribe(() => this.actualizarPatrimonio());

    this.creditForm.valueChanges.subscribe(() => {
      this.validateFirstStep();
      this.validateSecondStep();
    });
  }

  actualizarPatrimonio() {
    const activoRaw = this.creditForm.get('activo')?.value || '0';
    const pasivoRaw = this.creditForm.get('pasivo')?.value || '0';

    // Eliminar puntos (separadores de miles) y convertir a número
    const activo = Number(activoRaw.toString().replace(/\./g, ''));
    const pasivo = Number(pasivoRaw.toString().replace(/\./g, ''));

    if (isNaN(activo) || isNaN(pasivo)) {
      console.warn('Activo o pasivo no es un número válido');
      this.creditForm.get('patrimonio')?.setValue('', { emitEvent: false });
      return;
    }

    const patrimonio = activo - pasivo;

    // Actualiza el campo patrimonio formateado
    this.creditForm
      .get('patrimonio')
      ?.setValue(patrimonio.toLocaleString('es-CO'), { emitEvent: false });

    // Guardamos un flag para el color (en lugar de manipular el DOM)
    this.isPatrimonioNegativo = patrimonio < 0;
  }

  onSelectCreditLine(event: any) {
    const selectedCategoria = event.target.value;
    this.selectedCreditLine = this.datos.find(
      (item) => item.description === selectedCategoria,
    );

    const minMonto = this.selectedCreditLine?.rangeInitial;
    const maxMonto = this.selectedCreditLine?.rangeFinally;
    const maxPlazo = this.selectedCreditLine?.biweeklyTerm;

    this.creditForm
      .get('monto')
      ?.setValidators([
        Validators.required,
        Validators.min(minMonto || 0),
        Validators.max(maxMonto || 0),
      ]);

    this.creditForm
      .get('activo')
      ?.setValidators([Validators.required, Validators.min(0)]);

    this.creditForm
      .get('cuota')
      ?.setValidators([
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
        Validators.min(1),
        Validators.max(maxPlazo || 0),
      ]);

    this.creditForm.get('monto')?.updateValueAndValidity();
    this.creditForm.get('pasivo')?.updateValueAndValidity();
    this.creditForm.get('activo')?.updateValueAndValidity();
    this.creditForm.get('cuota')?.updateValueAndValidity();
  }

  validator(event: any, controlName: string) {
    let inputValue = event.target.value;

    // Eliminar todo lo que no sea número
    inputValue = inputValue.replace(/\D/g, '');

    // Formatear con separadores de miles
    const formattedValue = Number(inputValue).toLocaleString('es-CO');

    // Actualizar la vista del input
    event.target.value = formattedValue;

    // Actualizar el FormControl correspondiente sin disparar evento
    this.creditForm
      .get(controlName)
      ?.setValue(inputValue, { emitEvent: false });
  }

  onCategoryChange() {
    this.uploadedDocuments = {}; // Reiniciar archivos
  }

  get documents(): FormArray {
    return this.creditForm.get('documents') as FormArray;
  }

  showFamilies() {
    if (!this.creditForm.get('familiesCheck')?.value) {
      this.creditForm.get('parents')?.setValue('');
      this.creditForm.get('documentoFamiliar')?.setValue('');
      this.dataGroupParents = {} as ConnectedGroupRequestDto;
    }
  }

  onDocumentsUploaded(files: { [key: string]: UploadedDocument }) {
    this.uploadedDocuments = files;
    this.validateThirdStep();
  }

  validateUploadedDocuments(): number {
    if (!this.allRequiredDocuments?.length) return 0;

    const missingRequiredDocs = this.allRequiredDocuments.filter((reqDoc) => {
      const uploadedDoc = this.uploadedDocuments[reqDoc.name];
      return reqDoc.required && (!uploadedDoc || !uploadedDoc.file);
    });

    return missingRequiredDocs.length;
  }

  async FileSelectedDoc(event: any): Promise<string> {
    const file = event;
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        this.fileBase64 = base64;
        resolve(base64);
      };

      reader.onerror = (error) => reject(error);

      reader.readAsDataURL(file);
    });
  }

  calculateLoan(): number {
    const term = this.creditForm.get('plazo')?.value;
    const loan = Number(this.creditForm.get('monto')?.value);
    const rate =
      term == 'Q'
        ? Number(this.selectedCreditLine?.biweeklyInteresRate)
        : Number(this.selectedCreditLine?.biweeklyInteresRate) * 2;
    const plazo = Number(this.creditForm.get('cuota')?.value);
    const prima1 = 0;
    const prima2 = 0;

    // 🔹 Validaciones
    if (!loan || loan <= 0) {
      return 0;
    }

    if (!rate || rate <= 0) {
      return 0;
    }

    if (!plazo || plazo <= 0) {
      return 0;
    }

    // 🔹 Cálculo
    const result = this.loanService.calculateLoan(
      loan,
      rate,
      plazo,
      'vencida',
      prima1,
      prima2,
    );

    // 🔹 Resultado
    if (result) {
      this.payment = result.payment.toString(); // número limpio
      return result.payment;
    } else {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: ApiConstants.ALERT_ERROR_QUOTA,
      });
    }

    return 0;
  }

  showQuote() {
    this.payment = this.calculateLoan().toLocaleString('es-CO');
  }

  async saveCredit() {
    this.laoderService.show();

    const montoControl = this.creditForm.get('monto');
    if (montoControl) {
      let monto = montoControl.value;

      monto = monto ? monto.replace(/\D/g, '') : '';
      monto = monto !== '0' ? monto : '';
      montoControl.setValue(monto, { emitEvent: false });
    }

    if (this.creditForm.get('familiesCheck')?.value) {
      this.dataGroupParents.creditId = null;
      this.dataGroupParents.document =
        this.creditForm.get('documentoFamiliar')?.value;
      this.dataGroupParents.description = this.creditForm.get('parents')?.value;
    }

    const formData: CreditsRequestDto = {
      creditRequestDto: {
        creditline: this.creditForm.get('creditline')?.value || '',
        creditlineGuid: this.selectedCreditLine?.guid || null,
        stateGuid: '089B58DB-826D-4979-9814-EFDE5D9F3F1A',
        document: this.documentId || null,
        term: this.creditForm.get('cuota')?.value || 0,
        amount: Number(this.creditForm.get('monto')?.value.replace(/\./g, '')),
        quota: this.calculateLoan(),
        termDescription: this.creditForm.get('plazo')?.value,
        comments: this.creditForm.get('comments')?.value || '',
        phone: this.creditForm.get('phone')?.value || '',
        email: this.creditForm.get('email')?.value || '',
        pagare: '',
      },
      documentsRequestDto: ([] = await Promise.all(
        Object.entries(this.uploadedDocuments).map(async ([name, doc]) => ({
          creditId: null,
          name: name,
          type: doc.file?.type || 'application/pdf',
          content: (await this.FileSelectedDoc(doc.file)) || null,
        })),
      )),
      connectedGroupRequestDto: this.dataGroupParents,
      financialDataRequestDto: {
        creditId: null,
        assets: Number(
          (this.creditForm.get('activo')?.value || '0').replace(/\./g, ''),
        ),
        liabilities: Number(
          (this.creditForm.get('pasivo')?.value || '0').replace(/\./g, ''),
        ),
        equity: Number(
          (this.creditForm.get('patrimonio')?.value || '0').replace(/\./g, ''),
        ),
      },
    };

    this.creditService.createCredit(formData).subscribe(
      (response) => {
        this.laoderService.hide();
        if (response && response.success) {
          var code = response.content || '';
          swal
            .fire({
              title: 'Buen trabajo!',
              text: ApiConstants.ALERT_SUCCESS_CREDIT_SAVED,
              icon: 'success',
              confirmButtonText: 'Ir a mis créditos',
            })
            .then((result) => {
              if (result.isConfirmed) {
                this.routers.navigate(['/my-credits', this.documentId]);
              }
            });
        } else {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.message || ApiConstants.ALERT_ERROR_SAVE_DATA,
          });
        }

        this.laoderService.hide();
      },
      (error) => {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: ApiConstants.ALERT_ERROR_SAVE_DATA,
        });
        this.laoderService.hide();
      },
    );
  }

  validateUserByDocument(): void {
    this.laoderService.show();

    this.externalService
      .GetUserSingleByDocument(Number(this.documentId))
      .subscribe(
        (response) => {
          if (response && response.success && response.content) {
            this.asociadoInfo = response.content as AsociadoInfo;

            this.creditForm
              .get('email')
              ?.setValue(this.asociadoInfo.email || '', { emitEvent: false });
            this.creditForm
              .get('phone')
              ?.setValue(this.asociadoInfo.celular || '', { emitEvent: false });
          } else {
            swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: ApiConstants.ALERT_USERVALIDATE_NOTEXIST,
            });
          }
        },
        (error) => {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: ApiConstants.ALERT_ERROR_GET_USEREXIST,
          });
        },
      );

    this.laoderService.hide();
  }
}
