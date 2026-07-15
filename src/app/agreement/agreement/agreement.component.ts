import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { AgreementService } from '../../services/agreement.service';
import {
  AgreementExternalDto,
  CategoriesExternalDto,
  IAgreement,
} from '../../models/agreement.interfaces';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css'],
})
export class AgreementComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private service: AgreementService
  ) {}

  loader = true;
  categoriesAll: CategoriesExternalDto[] = [];
  agreementsAll: AgreementExternalDto[] = [];
  agreementsFiltered: AgreementExternalDto[] = [];
  filterActive: string | null = null;
  titlePage = 'Convenios';

  ngOnInit(): void {
    this.loadAgreement();
  }

  loadAgreement() {
    this.service.getAll().subscribe({
      next: (response) => {
        if (response.success) {
          this.categoriesAll = response.content;
          this.agreementsAll = this.categoriesAll.flatMap((c) =>
            c.agreements.map((a) => ({
              ...a,
              nameCategory: c.name,
            }))
          );
          this.agreementsFiltered = this.agreementsAll;
          this.loader = false;
        } else {
          swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.message ?? '',
          });
        }
      },
      error: (error: any) => {
        swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.message,
        });
        this.loader = false;
      },
    });
  }

  get() {
    const filter = this.route.snapshot.paramMap.get('filter') || 'TODOS';
    this.filter(filter, '');
  }

  filter(categoryGuid: string | null, category: string) {
    this.filterActive = categoryGuid;

    if (!categoryGuid) {
      this.agreementsFiltered = this.agreementsAll;
      return;
    }

    this.agreementsFiltered = this.agreementsAll.filter(
      (x) => x.categoryGuid === categoryGuid
    );
  }

  download(file: AgreementExternalDto) {
    if (file && file.content) {
      const linkSource = `data:application/octet-stream;base64,${file.content}`;
      const downloadLink = document.createElement('a');
      downloadLink.href = linkSource;
      downloadLink.download = file.nameFile || 'downloadedFile';
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
