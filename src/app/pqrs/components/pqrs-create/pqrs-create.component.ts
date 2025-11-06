import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  pqrsModel,
  pqrsRequestModel,
  PqrsUserValidateModel,
} from '../../model/pqrs-model';
import { PqrsService } from '../../services/pqrs.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import swal from 'sweetalert2';
import { ApiConstants } from 'src/app/Core/Constants/apiConstants';
declare const tinymce: any;

@Component({
  selector: 'app-pqrs-create',
  templateUrl: './pqrs-create.component.html',
  styleUrls: ['./pqrs-create.component.css'],
})
export class PqrsCreateComponent {
  pqrsForm!: FormGroup;
  guid!: string;
  selectedGuidType!: string;
  selectedFile: File | null = null;
  fileBase64: string = '';
  selectedFileDoc: File | null = null;
  enableDocument: boolean = false;
  pqrs: pqrsModel | null = null;
  timeDayCalculate: number = 0;
  @Input() pqrsUserValidate!: PqrsUserValidateModel;

  constructor(
    private fb: FormBuilder,
    private service: PqrsService,
    private routers: Router,
    private laoderService: LoaderService
  ) {
    this.pqrsForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      description: [''],
      content: [null],
      type: [''],
      nameFile: [''],
      date: [''],
      document: [''],
      pqrsStateGuid: ['', [Validators.required]],
      pqrsTypeGuid: ['', [Validators.required]],
      pqrsTypeCategoryGuid: ['', [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    // Esperar que TinyMCE del CDN esté disponible
    if (typeof tinymce !== 'undefined') {
      tinymce.init({
        selector: '#descriptionpqrs',
        height: 300,
        menubar: false,
        plugins: 'link lists code table image preview fullscreen',
        toolbar:
          'undo redo | bold italic underline | bullist numlist | link image | code preview fullscreen',
        setup: (editor: any) => {
          editor.on('Change KeyUp', () => {
            const content = editor.getContent();
            this.pqrsForm
              .get('description')
              ?.setValue(content, { emitEvent: false });
          });
        },
      });
    }
  }

  ngOnDestroy(): void {
    if (typeof tinymce !== 'undefined') {
      tinymce.remove();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pqrsUserValidate'] && this.pqrsUserValidate) {
      this.initForm();
    }
  }

  initForm(): void {
    this.pqrsForm = this.fb.group({
      name: [
        this.pqrsUserValidate?.nombreCompleto?.toLowerCase() || '',
        [Validators.required],
      ],
      email: [
        this.pqrsUserValidate?.email?.toLowerCase() || '',
        [Validators.required, Validators.email],
      ],
      description: [''],
      content: [null],
      type: [''],
      document: [''],
      nameFile: [''],
      date: [Date.now()],
      userGuid: [null],
      pqrsStateGuid: [null],
      pqrsTypeGuid: [null, [Validators.required]],
      pqrsTypeCategoryGuid: [null, [Validators.required]],
    });
  }

  onStateChange(value: string): void {
    this.pqrsForm.get('pqrsStateGuid')?.setValue(value);
  }

  onPqrsCategory(value: string): void {
    this.pqrsForm.get('pqrsTypeGuid')?.setValue(value);
    this.pqrsForm.get('pqrsTypeCategoryGuid')?.reset();
  }

  onPqrsCategoryOption(value: string): void {
    this.pqrsForm.get('pqrsTypeCategoryGuid')?.setValue(value);
  }

  save(): void {
    this.laoderService.show();

    const pqrs: pqrsRequestModel = {
      guid: null,
      name: this.pqrsForm.value.name ?? null,
      email: this.pqrsForm.value.email ?? null,
      userGuid: null,
      description: this.pqrsForm.value.description ?? null,
      content: this.fileBase64 != '' ? this.fileBase64 : null,
      type: this.pqrsForm.value.type ?? null,
      pqrsStateGuid: '0417fc29-c944-4bd9-9437-0c9dec24e249', // Estado por defecto - pendiente
      pqrsTypeGuid: this.pqrsForm.value.pqrsTypeGuid ?? null,
      pqrsTypeCategoryGuid: this.pqrsForm.value.pqrsTypeCategoryGuid ?? null,
      userGuidApproved: null,
      document: this.pqrsUserValidate.cedulasociado ?? null,
    };

    this.service.createPqrs(pqrs).subscribe(
      (response) => {
        if (response && response.success) {
          var code = response.content || '';
          this.laoderService.hide();
          swal
            .fire({
              title: 'Buen trabajo!',
              text: ApiConstants.ALERT_SUCCESS_PQRS_SAVED.replace(
                '{peticion}',
                code.toString()
              ),
              icon: 'success',
            })
            .then((result) => {
              if (result.isConfirmed) {
                this.initForm();
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
          text: ApiConstants.ALERT_ERROR_GET_DATA,
        });
        this.laoderService.hide();
      }
    );
  }

  onFileSelectedDoc(event: any) {
    const file = event;
    this.selectedFileDoc = file;
    this.pqrsForm.get('type')?.setValue(file.type);

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      this.fileBase64 = result.split(',')[1];
    };
    reader.readAsDataURL(file);
  }

  loadFile(): void {
    this.enableDocument = true;
  }

  downloadFile(): void {
    if (this.pqrs?.content) {
      const fileContent = this.pqrs.content;
      const fileName = this.pqrsForm.value.nameFile;

      const link = document.createElement('a');
      link.href = 'data:application/pdf;base64,' + fileContent;
      link.download = fileName;
      link.click();
    }
  }
}
