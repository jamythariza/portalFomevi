import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import swal from 'sweetalert2';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report-memebership-certificated',
  templateUrl: './report-memebership-certificated.component.html',
  styleUrls: ['./report-memebership-certificated.component.css'],
})
export class ReportMemebershipCertificatedComponent implements OnInit {
  formReport!: FormGroup;
  documentoId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private reportService: ReportService,
    private loaderService: LoaderService
  ) {
    this.formReport = this.fb.group({
      ciudad: ['', [Validators.required]],
      dirigido: ['', [Validators.required, Validators.email]],
      intTipo: [''],
    });
  }

  ngOnInit(): void {
    this.documentoId = this.route.snapshot.paramMap.get('documentoId') ?? '';
  }

  generateReport() {
    this.loaderService.show();

    const document = this.documentoId;
    const ciudad = this.formReport.get('ciudad')?.value;
    const dirigido = this.formReport.get('dirigido')?.value;
    const intTipo = this.formReport.get('intTipo')?.value ? '1' : '0';
    const tipoDato = 'PDF';
    const visualizacion = 'inline';

    this.reportService
      .CertificateReport(
        document,
        ciudad,
        dirigido,
        intTipo,
        tipoDato,
        visualizacion
      )
      .subscribe({
        next: (blob: Blob) => {
          console.log('response', blob);

          if (!blob || blob.size === 0) {
            throw new Error('El archivo está vacío');
          }

          const url = window.URL.createObjectURL(blob);
          window.open(url, '_blank');

          this.loaderService.hide();
        },
        error: (error: any) => {
          console.error(error);

          swal.fire({
            icon: 'error',
            title: 'Error',
            text: error?.error?.message || 'Error al generar el reporte',
          });

          this.loaderService.hide();
        },
      });
  }
}
