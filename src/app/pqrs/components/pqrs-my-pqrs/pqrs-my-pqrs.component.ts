import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { filter } from 'rxjs';
import { PqrsByDocumentFilterModel, pqrsModel } from '../../model/pqrs-model';
import { PqrsService } from '../../services/pqrs.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { ApiConstants } from 'src/app/Core/Constants/apiConstants';
import swal from 'sweetalert2';

@Component({
  selector: 'app-pqrs-my-pqrs',
  templateUrl: './pqrs-my-pqrs.component.html',
  styleUrls: ['./pqrs-my-pqrs.component.css'],
})
export class PqrsMyPqrsComponent {
  @Input() filter!: PqrsByDocumentFilterModel;
  data: pqrsModel[] = [];

  constructor(
    private service: PqrsService,
    private routers: Router,
    private laoderService: LoaderService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter'] && this.filter) {
      this.loadData();
    }
  }

  private loadData(): void {
    this.laoderService.show();
    this.service.GetPqrsByDocument(this.filter).subscribe(
      (response) => {
        if (response && response.success) {
          this.data = response.content || [];
        } else {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.message || ApiConstants.ALERT_ERROR_GET_DATA,
          });
        }
        this.laoderService.hide();
      },
      (error) => {
        this.laoderService.hide();
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: ApiConstants.ALERT_ERROR_GET_DATA,
        });
      }
    );
  }
}
