import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { ReportService } from '../../services/report.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-report-account-discrimination',
  templateUrl: './report-account-discrimination.component.html',
  styleUrls: ['./report-account-discrimination.component.css'],
})
export class ReportAccountDiscriminationComponent implements OnInit {
  documentoId!: string;

  months = [
    { value: 1, name: 'Enero' },
    { value: 2, name: 'Febrero' },
    { value: 3, name: 'Marzo' },
    { value: 4, name: 'Abril' },
    { value: 5, name: 'Mayo' },
    { value: 6, name: 'Junio' },
    { value: 7, name: 'Julio' },
    { value: 8, name: 'Agosto' },
    { value: 9, name: 'Septiembre' },
    { value: 10, name: 'Octubre' },
    { value: 11, name: 'Noviembre' },
    { value: 12, name: 'Diciembre' },
  ];

  years: number[] = [];

  selectedMonth!: number;
  selectedYear!: number;

  constructor(
    private route: ActivatedRoute,
    private reportService: ReportService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.documentoId = this.route.snapshot.paramMap.get('documentoId') ?? '';

    const currentYear = new Date().getFullYear();
    this.years = Array.from(
      { length: currentYear - 2015 + 1 },
      (_, i) => 2015 + i
    );

    // Opcional: valores por defecto
    this.selectedMonth = new Date().getMonth();
    this.selectedYear = currentYear;
    // if (this.documentoId && this.documentoId !== 'null') this.Info();
  }

  generateReport() {
    this.loaderService.show();

    const year = this.selectedYear.toString();
    const month = this.selectedMonth.toString().padStart(2, '0');
    const document = this.documentoId;
    const tipoDato = 'PDF';
    const visualizacion = 'inline';

    this.reportService
      .DiscriminatedReport(document, year, month, tipoDato, visualizacion)
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
