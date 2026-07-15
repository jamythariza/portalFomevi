import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SurveyService } from '../../services/survey.service';
import { LoaderService } from 'src/app/services/loader.service';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { SurveyValidateUserDto } from '../../model/Survey-answer-request';

@Component({
  selector: 'app-validate-user',
  templateUrl: './validate-user.component.html',
  styleUrls: ['./validate-user.component.css'],
})
export class ValidateUserComponent implements OnInit {
  @Output() submitCompleted = new EventEmitter<{
    success: boolean;
    document: string;
  }>();
  guid: string | null = null;
  surveyResponseForm!: FormGroup;
  userDocument: string = '';
  responseDto: SurveyValidateUserDto = {} as SurveyValidateUserDto;

  constructor(
    private fb: FormBuilder,
    private service: SurveyService,
    private loaderService: LoaderService,
    private route: ActivatedRoute
  ) {
    this.surveyResponseForm = this.fb.group({
      document: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.guid = this.route.snapshot.paramMap.get('guid') ?? null;

    if (this.guid && this.guid !== 'null') {
    }
  }

  onSubmit() {
    const document = this.surveyResponseForm.get('document')?.value;
    const id = this.guid ?? '';

    this.service.getSurveyByDocumentId(id, document).subscribe(
      (response) => {
        if (response.success) {
          this.responseDto = response.content;
          this.submitCompleted.emit({
            success: this.responseDto.hasResponded,
            document: document,
          });
        }
        this.loaderService.hide();
      },
      (error) => {
        swal.fire({
          title: 'Error!',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'Continuar',
        });
        this.loaderService.hide();
      }
    );
  }
}
