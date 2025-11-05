import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ArticleDto,
  ArticleImageDto,
  ArticleRequestDto,
} from '../../model/article-request-dto';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { login } from 'src/app/models/login';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-my-article',
  templateUrl: './create-my-article.component.html',
  styleUrls: ['./create-my-article.component.css'],
})
export class CreateMyArticleComponent implements OnInit {
  @ViewChild('imageInput') imageInput!: ElementRef;
  articleForm!: FormGroup;
  guid: string | null = null;
  documentoId!: string;
  selectedFile: File | null = null;
  selectedImageFile: File | null = null;
  fileBase64: string = '';
  imageArticleBase64: string = '';
  categoryGuid: string = '';
  stateGuid: string = '';
  article: ArticleDto | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  articleImages: ArticleImageDto[] = [];
  validatedFirstStep: boolean = false;
  validatedSecondStep: boolean = false;
  validatedThirdStep: boolean = false;

  step = 1;
  totalSteps = 4;

  constructor(
    private fb: FormBuilder,
    private service: ArticleService,
    private routers: Router,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      price: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      categoryGuid: ['', [Validators.required]],
      stateGuid: ['39DC7478-BA2E-4E03-9F58-BDEF0E3E0D38'],
      stateArticle: [null, [Validators.required]],
      ubication: ['', [Validators.required]],
      image: [null],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });
  }

  nextStep() {
    if (this.step < this.totalSteps) this.step++;
  }

  prevStep() {
    if (this.step > 1) this.step--;
  }

  progressWidth(): string {
    return `${(this.step / this.totalSteps) * 100}%`;
  }

  ngOnInit(): void {
    this.guid = this.route.snapshot.paramMap.get('guid') ?? null;
    this.documentoId = this.route.snapshot.paramMap.get('documentoId') ?? '';

    var credentials: login = {
      user: environment.user,
      password: environment.password,
      email: '',
    };

    if (this.documentoId && this.documentoId !== 'null')
      this.auth.login(credentials).subscribe({
        next: () => {
          this.getInfo();
        },
        error: (err) => console.error('Error en login:', err),
      });

    this.articleForm.valueChanges.subscribe(() => {
      this.validateFirstStep();
      this.validateSecondStep();
      this.validateThirdStep();
    });
  }

  validateFirstStep(): void {
    const image = this.articleForm.get('image')?.value != null;
    const title = this.articleForm.get('title')?.valid;
    const price = this.articleForm.get('price')?.value != null;
    const stateGuid = this.articleForm.get('stateGuid')?.value;
    const category = this.articleForm.get('categoryGuid')?.value;
    const stateArticle = this.articleForm.get('stateArticle')?.value;
    const ubication = this.articleForm.get('ubication')?.value;

    this.validatedFirstStep = !!(
      title &&
      image &&
      price &&
      stateGuid &&
      category &&
      stateArticle &&
      ubication
    );
  }

  validateSecondStep(): void {
    const fullName = this.articleForm.get('fullName')?.valid;
    const email = this.articleForm.get('email')?.valid;
    const phone = this.articleForm.get('phone')?.valid;
    this.validatedSecondStep = !!(fullName && email && phone);
  }

  validateThirdStep(): void {
    const articleImages = this.articleImages.length > 0;
    this.validatedThirdStep = !!articleImages;
  }

  getInfo() {
    const guid = this.guid ? this.guid : '';

    this.service.getArticleById(guid).subscribe(
      (response) => {
        if (response) {
          this.article = response.content || null;
          this.articleImages = [...(this.article?.articleImages || [])];

          this.imagePreview = this.article?.imageBase64 || null;

          this.articleForm.patchValue({
            title: this.article?.title || '',
            description: this.article?.description || '',
            price: this.article?.price || '',
            categoryGuid: this.article?.categoryGuid || '',
            stateGuid: this.article?.stateGuid || '',
            stateArticle: this.article?.stateArticle || '',
            ubication: this.article?.ubication || '',
            image: this.article?.imageBase64,
            imageBase64: this.article?.imageBase64,
            fullName: this.article?.seller?.fullName || '',
            phone: this.article?.seller?.phone || '',
            email: this.article?.seller?.email || '',
          });
        }
      },
      (error) => {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error,
        });
      }
    );
  }

  validator(event: any, controlName: string) {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/\D/g, '');

    const formattedValue = Number(inputValue).toLocaleString('es-CO');
    event.target.value = formattedValue;

    this.articleForm
      .get(controlName)
      ?.setValue(inputValue, { emitEvent: false });
  }

  onCategoryChange(value: string): void {
    this.articleForm.get('categoryGuid')?.setValue(value);
  }

  onStateArticleChange(value: string): void {
    this.articleForm.get('stateArticle')?.setValue(value);
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];

      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;
        const base64 = (reader.result as string).split(',')[1];
        this.articleForm.patchValue({ image: base64 });
        this.articleForm.get('image')?.updateValueAndValidity();
      };

      reader.onerror = (e) => {
        console.error('❌ Error al leer archivo:', e);
      };

      reader.readAsDataURL(this.selectedFile);
    }
  }

  onFileImageSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImageFile = fileInput.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.imageArticleBase64 = base64String.split(',')[1];
      };

      reader.readAsDataURL(this.selectedImageFile);
    }
  }

  saveImage(): void {
    if (!this.imageArticleBase64 || !this.selectedImageFile) {
      swal.fire({
        title: 'Oops...',
        text: 'Debes seleccionar una imagen antes de guardar.',
        icon: 'error',
      });
      return;
    }

    const image: ArticleImageDto = {
      guid: null,
      fileName: this.selectedImageFile.name,
      imageBase64: this.imageArticleBase64?.startsWith('data:image')
        ? this.imageArticleBase64
        : `data:image/jpeg;base64,${this.imageArticleBase64}`,
      image: null,
    };

    this.articleImages.push(image);

    // Limpieza opcional
    this.imageArticleBase64 = '';
    this.selectedImageFile = null;

    if (this.imageInput) {
      this.imageInput.nativeElement.value = '';
    }

    this.validateThirdStep();

    swal.fire({
      title: 'Buen trabajo!',
      text: 'Se ha guardo correctamente',
      icon: 'success',
    });
  }

  save(): void {
    this.step = 4;

    var imagesSave = this.articleImages
      .filter((item) => item.guid == null)
      .map((item) => ({
        ...item,
        imageBase64:
          item.imageBase64?.replace(/^data:image\/[a-zA-Z]+;base64,/, '') ?? '',
      }));

    const article: ArticleRequestDto = {
      title: this.articleForm.value.title ?? null,
      documentoId: this.documentoId,
      description: this.articleForm.value.description ?? null,
      guid: this.guid ?? null,
      price: this.articleForm.value.price ?? null,
      categoryGuid: this.articleForm.value.categoryGuid ?? null,
      sellerId: null,
      stateGuid: this.articleForm.value.stateGuid ?? null,
      image:
        this.guid == null
          ? this.articleForm.value.image
          : this.articleForm.value?.image.includes(',')
          ? this.articleForm.value.image.split(',')[1]
          : this.articleForm.value.image,
      stateArticle: this.articleForm.value.stateArticle ?? null,
      ubication: this.articleForm.value.ubication ?? null,
      seller: {
        fullName: this.articleForm.value.fullName ?? null,
        phone: this.articleForm.value.phone ?? null,
        email: this.articleForm.value.email ?? null,
      },
      articleImages: imagesSave,
    };

    const userServiceAction =
      this.guid && this.guid !== null && this.guid !== null
        ? this.service.updateArticle(article)
        : this.service.createArticle(article);

    const successMessage =
      this.guid && this.guid !== null && this.guid !== null
        ? 'Actualización realizada con éxito.'
        : 'Los datos se guardaron exitosamente';

    userServiceAction.subscribe(
      (response) => {
        if (response.success) {
          swal
            .fire({
              title: 'Buen trabajo!',
              text: successMessage,
              icon: 'success',
            })
            .then((result) => {
              if (result.isConfirmed) {
                this.routers.navigate(['/detail-my-articles/:', article.guid]);
              }
            });
        } else {
          swal.fire({
            title: 'Oops...',
            text: response.message?.toString(),
            icon: 'error',
          });
        }
      },
      (error) => {
        this.showNotification('Oops...', error.error, 'error');
      }
    );
  }

  private showNotification(
    title: string,
    text: string,
    icon: 'success' | 'error'
  ): void {
    swal.fire({
      title,
      text,
      icon,
    });
  }
}
