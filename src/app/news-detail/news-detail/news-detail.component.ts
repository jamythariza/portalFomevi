import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { INews } from 'src/app/models/news.interfaces';
import swal from 'sweetalert2';
import { FormGroup } from '@angular/forms';
import { NewModel } from 'src/app/news/model/new-model';
import { ApiConstants } from 'src/app/Core/Constants/apiConstants';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css'],
})
export class NewsDetailComponent implements OnInit {
  newForm!: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  newSingle: NewModel | null = null;
  guid!: string;
  uploadedFiles: { [key: string]: File | null } = {};
  nameFile!: string;
  typeFile!: string;
  fileBase64!: string;
  selectedFileDoc: File | null = null;
  textoHtml: string = '';
  safeDescription: SafeHtml | null = null;

  constructor(
    private route: ActivatedRoute,
    private service: NewsService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.guid = this.route.snapshot.paramMap.get('id') ?? '';

    if (this.guid && this.guid !== 'null') {
      this.getNew();
    }
  }

  getNew() {
    const guid = this.route.snapshot.paramMap.get('id') ?? '';

    this.service.getNewById(guid).subscribe(
      (response) => {
        if (response && response.success) {
          this.newSingle = response.content;

          if (this.newSingle?.description) {
            this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(
              this.newSingle.description
            );
          }
          this.imagePreview = response.content?.imageBase64 || null;
        }
      },
      (error) => {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: ApiConstants.ALERT_ERROR_GET_DATA,
        });
      }
    );
  }

  download() {
    if (this.newSingle && this.newSingle?.content) {
      const linkSource = `data:application/octet-stream;base64,${this.newSingle.content}`;
      const downloadLink = document.createElement('a');
      downloadLink.href = linkSource;
      downloadLink.download = this.newSingle.nameFile || 'downloadedFile';
      downloadLink.click();
    } else {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No hay archivo para descargar.',
      });
    }
  }
}
