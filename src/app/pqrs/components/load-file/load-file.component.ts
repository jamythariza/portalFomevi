import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-load-file',
  templateUrl: './load-file.component.html',
  styleUrls: ['./load-file.component.css'],
})
export class LoadFileComponent {
  @Output() documentsUploaded = new EventEmitter<File | null>();
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  selectedFileDoc: File | null = null;

  ngOnChanges() {
    this.selectedFileDoc = null;
  }

  reset() {
    if (this.fileInput?.nativeElement) {
      this.selectedFileDoc = null;
      this.fileInput.nativeElement.value = '';
    }
  }

  onFileSelectedDoc(event: any) {
    const file = event.target.files[0];

    if (file && file.type === 'application/pdf') {
      this.selectedFileDoc = file; // Asignar el archivo al documento correspondiente
      this.documentsUploaded.emit(this.selectedFileDoc); // Emitir el objeto actualizado al componente padre
    } else {
      alert('Solo se permiten archivos PDF.');
      event.target.value = ''; // Resetear el input si el archivo no es PDF
    }
  }
}
