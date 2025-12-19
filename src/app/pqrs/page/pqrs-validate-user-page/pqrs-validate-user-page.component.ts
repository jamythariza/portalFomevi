import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  PqrsByDocumentFilterModel,
  PqrsUserValidateModel,
} from '../../model/pqrs-model';
import { LoaderService } from 'src/app/services/loader.service';
import { ExternalService } from 'src/app/services/external.services';
import swal from 'sweetalert2';
import { ApiConstants } from 'src/app/Core/Constants/apiConstants';

@Component({
  selector: 'app-pqrs-validate-user-page',
  templateUrl: './pqrs-validate-user-page.component.html',
  styleUrls: ['./pqrs-validate-user-page.component.css'],
})
export class PqrsValidateUserPageComponent {
  pqrsForm!: FormGroup;
  pqrsForm2!: FormGroup;
  correo: string = 'auxiliarmedellin2@fomevi.com';
  userIsValid: boolean = false;
  pqrsUserValidateModel!: PqrsUserValidateModel;
  filter!: PqrsByDocumentFilterModel;

  constructor(
    private fb: FormBuilder,
    private laoderService: LoaderService,
    private service: ExternalService
  ) {
    this.pqrsForm2 = this.fb.group({
      document: ['', [Validators.pattern(/^[0-9]+$/)]],
      code: [''],
    });

    this.pqrsForm = this.fb.group({
      document: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });
  }

  validateUserByDocument(): void {
    this.laoderService.show();
    let doc = this.pqrsForm.value.document;

    this.service.GetUserSingleByDocument(doc).subscribe(
      (response) => {
        if (response && response.success && response.content) {
          this.userIsValid = response.success;
          this.pqrsUserValidateModel =
            response.content as PqrsUserValidateModel;

          swal
            .fire({
              title: 'Validación!',
              text: ApiConstants.ALERT_USERVALIDATE_EXIST.replace(
                '{name}',
                this.pqrsUserValidateModel.nombreCompleto || ''
              ),
              icon: 'success',
            })
            .then((result) => {
              if (result.isConfirmed) {
              }
            });
        } else {
          this.userIsValid = false;
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: ApiConstants.ALERT_USERVALIDATE_NOTEXIST,
          });
        }
      },
      (error) => {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: ApiConstants.ALERT_ERROR_GET_USEREXIST,
        });
      }
    );

    this.laoderService.hide();
  }

  findByDocument(): void {
    let code = this.pqrsForm2.value.code;
    let doc = this.pqrsForm2.value.document;

    this.filter = {
      code: code || null,
      document: doc || null,
    };
  }
}
