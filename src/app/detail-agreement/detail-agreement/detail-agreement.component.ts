import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AgreementExternalDto,
  IAgreement,
} from '../../models/agreement.interfaces';
import { AgreementService } from '../../services/agreement.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-detail-agreement',
  templateUrl: './detail-agreement.component.html',
  styleUrls: ['./detail-agreement.component.css'],
})
export class DetailAgreementComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private service: AgreementService
  ) {}
  loader = true;
  // agreements: IAgreement = {} as IAgreement;
  agreements: AgreementExternalDto = {} as AgreementExternalDto;
  titlePage = 'Detalle';

  ngOnInit(): void {
    this.getAgreement();
  }

  getAgreement() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';

    this.service.GetCategotyByID(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.agreements = response.content;
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

    // this.service.getById(id).subscribe(res => {
    //   this.agreements = res
    //   this.loader = false;
    // });
  }
}
