import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CreditlineService } from '../../services/creditline.service';
import { ActivatedRoute } from '@angular/router';
import { CreditLineExternalDto } from '../../models/creditLine.interface';
import swal from 'sweetalert2';
@Component({
  selector: 'app-detail-creditline',
  templateUrl: './detail-creditline.component.html',
  styleUrls: ['./detail-creditline.component.css'],
})
export class DetailCreditlineComponent implements OnInit {
  @Output()
  propagar = new EventEmitter<string>();
  credits: CreditLineExternalDto = {} as CreditLineExternalDto;
  titlePage = 'Detalle';
  loader = true;
  constructor(
    private service: CreditlineService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getSingle();
  }

  procesaPropagar(id: string) {
    this.getSingle();
  }

  getSingle() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';

    this.service.GetCreditLineByID(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.credits = response.content;
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
}
