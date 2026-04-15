import { Component, OnInit } from '@angular/core';
import { CreditService } from '../../services/credit.service';
import { LoaderService } from 'src/app/services/loader.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import swal from 'sweetalert2';
import { ApiConstants } from 'src/app/Core/Constants/apiConstants';
import { CreditRequestModel } from '../../models/credit-form-model';
import { CreditListModel } from '../../models/credit-detail-dto-model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-credit-my-credits',
  templateUrl: './credit-my-credits.component.html',
  styleUrls: ['./credit-my-credits.component.css'],
})
export class CreditMyCreditsComponent implements OnInit {
  filterForm!: FormGroup;
  filter!: CreditRequestModel;
  credits: CreditListModel[] = [];
  documentId: string | null = null;

  badgeMap: Record<string, string> = {
    aprobada: 'status-success',
    preaprobado: 'status-default',
    pendiente: 'status-info',
    'por aprobar': 'status-info',
    'en estudio': 'status-warning',
    'no aprobada': 'status-error',
  };

  constructor(
    private service: CreditService,
    private loaderService: LoaderService,
    private fb: FormBuilder,
    private routers: Router,
    private route: ActivatedRoute,
  ) {
    this.filterForm = this.fb.group({
      creditState: ['089b58db-826d-4979-9814-efde5d9f3f1a'],
      companyName: [''],
      code: [''],
      creditline: [''],
      searchTerm: [''],
    });
  }

  ngOnInit() {
    this.documentId = this.route.snapshot.paramMap.get('documentoId') ?? null;

    if (this.documentId == null) {
      swal.fire({
        title: 'Error!',
        text: ApiConstants.ALERT_ERROR_SAVE_DATA,
        icon: 'error',
        confirmButtonText: 'Continuar',
      });
      this.routers.navigate(['/']);
    }

    this.getCredits();
  }

  getBadgeClass(state: string): string {
    const key = state?.toLowerCase();

    return this.badgeMap[state?.toLowerCase()] || 'status-default';
  }

  getCredits() {
    this.loaderService.show();

    this.service.GetCredits(this.documentId?.trim() ?? '').subscribe(
      (response) => {
        if (response.success) {
          this.credits = response.content;
          this.loaderService.hide();
        }
      },
      (error) => {
        this.loaderService.hide();
        swal.fire({
          title: 'Error!',
          text: ApiConstants.ALERT_ERROR_SAVE_DATA,
          icon: 'error',
          confirmButtonText: 'Continuar',
        });
      },
    );
  }

  createCredit() {
    this.routers.navigate(['/credit/', this.documentId]);
  }
}
