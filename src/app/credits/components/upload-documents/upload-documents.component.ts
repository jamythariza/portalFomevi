import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  BackendResponse,
  UploadedDocument,
} from '../../models/creditline-model';
import { CreditlineService } from 'src/app/services/creditline.service';
import { ApiConstants } from 'src/app/Core/Constants/apiConstants';
import swal from 'sweetalert2';

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.css'],
})
export class UploadDocumentsComponent implements OnInit {
  @Input() selectedCategory: string = ''; // Recibe la categoría seleccionada
  @Output() documentsUploaded = new EventEmitter<{
    [key: string]: UploadedDocument;
  }>();
  @Output() requiredDocumentsEmit = new EventEmitter<{
    [key: string]: { name: string; required: boolean }[];
  }>();

  requiredDocuments: { [key: string]: { name: string; required: boolean }[] } =
    {};

  constructor(private service: CreditlineService) {}

  // Almacena los archivos subidos
  uploadedFiles: { [key: string]: UploadedDocument } = {};

  ngOnInit() {
    this.infoData();
  }

  infoData(): void {
    this.service.GetCategoryFileAll().subscribe(
      (response) => {
        if (response.success) {
          this.mapRequiredDocuments(response.content);
        }
      },
      (error) => {
        swal.fire({
          title: 'Error!',
          text: ApiConstants.ALERT_ERROR_SAVE_DATA,
          icon: 'error',
          confirmButtonText: 'Continuar',
        });
      }
    );
  }

  mapRequiredDocuments(data: BackendResponse[]) {
    this.requiredDocuments = data.reduce((acc, item) => {
      acc[item.key] = item.value.map((v) => ({
        name: v.descriptionCategory,
        required: v.requiered,
      }));
      return acc;
    }, {} as { [key: string]: { name: string; required: boolean }[] });

    this.requiredDocumentsEmit.emit(this.requiredDocuments);
  }

  // Detectar cambios cuando se selecciona una categoría
  ngOnChanges() {
    this.uploadedFiles = {}; // Reiniciar archivos subidos
    if (this.selectedCategory) {
      // Reiniciar y cargar documentos requeridos según la categoría seleccionada
      this.requiredDocuments[this.selectedCategory]?.forEach((doc) => {
        this.uploadedFiles[doc.name] = {
          file: null,
          required: doc.required,
        };
      });
    }
  }

  // Manejar selección de archivos
  onFileSelected(event: any, documentType: string) {
    const file = event.target.files[0];

    if (file && file.type === 'application/pdf') {
      if (this.uploadedFiles[documentType]) {
        this.uploadedFiles[documentType].file = file; // Actualizar solo el file
      } else {
        // Por si el documento no existía, lo creamos (evita errores)
        this.uploadedFiles[documentType] = { file, required: false };
      }

      this.documentsUploaded.emit(this.uploadedFiles); // Emitir objeto actualizado
    } else {
      alert('Solo se permiten archivos PDF.');
      event.target.value = ''; // Resetear input
    }
  }

  // Validar si todos los documentos requeridos han sido subidos
  isFormValid(): boolean {
    // Verificar si todos los documentos requeridos han sido subidos
    const categoryDocs = this.requiredDocuments[this.selectedCategory] || [];
    return categoryDocs.every(
      (doc) => !doc.required || this.uploadedFiles[doc.name] !== null
    );
  }
}
