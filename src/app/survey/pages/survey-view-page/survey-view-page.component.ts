import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import {
  SurveyQuestionDto,
  SurveyResultDto,
} from '../../model/survey-response-model';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { SurveyService } from '../../services/survey.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  QuestionDto,
  SurveyAnswerRequest,
} from '../../model/Survey-answer-request';

@Component({
  selector: 'app-survey-view-page',
  templateUrl: './survey-view-page.component.html',
  styleUrls: ['./survey-view-page.component.css'],
})
export class SurveyViewPageComponent implements OnInit {
  survey: SurveyResultDto | null = null;
  guid: string | null = null;
  surveyQuestionResponseForm!: FormGroup;
  // formControl: FormControl<Date | null>;
  userDocument: string = '';
  canRespond: boolean | null = null;

  constructor(
    private fb: FormBuilder,
    private service: SurveyService,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private routers: Router
  ) {
    this.surveyQuestionResponseForm = this.fb.group({
      groups: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.guid = this.route.snapshot.paramMap.get('guid') ?? null;

    if (this.guid && this.guid !== 'null') {
      this.GetSurvey(this.guid);
    }
  }

  buildForm(): void {
    if (!this.survey?.groups) return;

    const groupArray = this.survey.groups.map((group) => {
      return this.fb.group({
        guidGroup: [group.guidGroup],
        titleGroup: [group.titleGroup],
        questions: this.fb.array(
          group.questions.map((q) => this.createQuestionControl(q))
        ),
      });
    });

    this.surveyQuestionResponseForm.setControl(
      'groups',
      this.fb.array(groupArray)
    );
  }

  getResponseFormGroup(question: AbstractControl): FormGroup {
    return question.get('response') as FormGroup;
  }

  createQuestionControl(question: SurveyQuestionDto): FormGroup {
    const control = this.fb.group({
      guidQuestion: [question.guidQuestion],
      titleQuestion: [question.titleQuestion],
      descriptionQuestion: [question.descriptionQuestion],
      isMandatory: [question.isMandatory],
      order: [question.order],
      questionType: [question.questionType],
      options: [question.options],
      optionScales: [question.optionScales],
      optionMatrix: [question.optionMatrix],
      response: this.createResponseControl(question),
    });
    return control;
  }

  createResponseControl(
    question: SurveyQuestionDto
  ): FormControl | FormArray | FormGroup {
    const isRequired = question.isMandatory ? [Validators.required] : [];

    switch (question.questionType?.descriptionQuestionType) {
      // Tipos simples: Texto Corto, Largo, Lista, Fecha, Hora
      case 'Texto Corto':
      case 'Texto Largo':
      case 'Opción Múltiple':
      case 'Lista Despegable':
      case 'Fecha':
      case 'Hora':
        return this.fb.control('', isRequired);

      // Casillas de verificación
      case 'Casillas de verificación':
        const checkboxArray = this.fb.array(
          question.options?.map(() => this.fb.control(false)) || []
        );
        if (question.isMandatory) {
          checkboxArray.setValidators(this.minSelectedCheckboxes(1));
        }
        return checkboxArray;

      // Escala lineal
      case 'Escala Lineal':
        return this.fb.control(null, isRequired);

      // Cuadrícula de opción múltiple
      case 'Cuadrícula de Opción Multiple':
        if (!question.optionMatrix || question.optionMatrix.length === 0) {
          return this.fb.group({});
        }

        // Obtenemos filas únicas
        const rows = Array.from(
          new Set(question.optionMatrix.map((m) => m.matrixRowText))
        );
        // Columnas únicas
        const columns = Array.from(
          new Set(question.optionMatrix.map((m) => m.matrixColumnText))
        );

        // Creamos un FormGroup: cada fila tiene un FormControl donde se guardará la columna seleccionada
        const matrixGroup = this.fb.group({});
        rows.forEach((row) => {
          // null como valor inicial, Validators.required si la pregunta es obligatoria
          matrixGroup.addControl(
            row,
            this.fb.control(
              null,
              question.isMandatory ? Validators.required : null
            )
          );
        });

        return matrixGroup;

      default:
        return this.fb.control('');
    }
  }

  getMatrixRows(optionMatrix: any[]): string[] {
    return Array.from(new Set(optionMatrix.map((m) => m.matrixRowText)));
  }

  getMatrixColumns(optionMatrix: any[]): string[] {
    return Array.from(new Set(optionMatrix.map((m) => m.matrixColumnText)));
  }

  minSelectedCheckboxes(min = 1): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const formArray = control as FormArray;
      if (!formArray || !(formArray instanceof FormArray)) return null;

      const totalSelected = formArray.controls
        .map((control) => control.value)
        .reduce((prev, next) => (next ? prev + 1 : prev), 0);

      return totalSelected >= min ? null : { required: true };
    };
  }

  get groups(): FormArray {
    return this.surveyQuestionResponseForm.get('groups') as FormArray;
  }

  getQuestions(groupIndex: number): FormArray {
    return this.groups.at(groupIndex).get('questions') as FormArray;
  }

  onSubmitCompleted(event: { success: boolean; document: string }) {
    this.canRespond = event.success;
    this.userDocument = event.document;

    if (event.success) {
      swal.fire({
        icon: 'info',
        title: 'Encuesta',
        text: `La encuesta: ${this.survey?.title}, ya fue contestada con ese documento.`,
      });

      this.routers.navigate(['']);
    }
  }

  async onSubmit() {
    const groupsArray = this.surveyQuestionResponseForm.get(
      'groups'
    ) as FormArray;

    const saveOption: SurveyAnswerRequest = {
      surveyGuid: this.guid || undefined,
      idDocumento: this.userDocument,
      groups: (
        this.surveyQuestionResponseForm.get('groups') as FormArray
      ).controls.map((groupCtrl) => {
        return {
          guidGroup: groupCtrl.get('guidGroup')?.value,
          titleGroup: groupCtrl.get('titleGroup')?.value,
          questions: (groupCtrl.get('questions') as FormArray).controls.map(
            (qCtrl) => {
              const question = qCtrl.value;
              return {
                guidQuestion: question.guidQuestion,
                descriptionQuestion: question.descriptionQuestion,
                questionType: question.questionType,
                options: question.options,
                optionScales: question.optionScales,
                optionMatrix: question.optionMatrix,
                response: this.getResponseValue(question),
              };
            }
          ),
        };
      }),
    };

    this.loaderService.show();
    this.service.createSurveyAnswer(saveOption).subscribe(
      (response) => {
        if (response.success) {
          this.loaderService.hide();
          this.surveyQuestionResponseForm.reset();
          swal
            .fire({
              title: 'Buen trabajo!',
              text: `Tu encuesta: ${
                this.survey?.title || ''
              } se ha guardado correctamente. Gracias por participar.`,
              icon: 'success',
            })
            .then((result) => {
              if (result.isConfirmed) {
                this.routers.navigate(['']);
              }
            });
        } else {
          this.loaderService.hide();
          swal.fire({
            title: 'Error!',
            text: 'Error al guardar los datos. Intente nuevamente más tarde. ',
            icon: 'error',
            confirmButtonText: 'Continuar',
          });
        }
      },
      (error) => {
        this.loaderService.hide();
        swal.fire({
          title: 'Error!',
          text: error.error,
          icon: 'error',
          confirmButtonText: 'Continuar',
        });
      }
    );
  }

  private getResponseValue(question: QuestionDto): any {
    const resp = question.response;

    switch (question.questionType?.descriptionQuestionType) {
      case 'Texto Corto':
      case 'Texto Largo':
      case 'Fecha':
      case 'Hora':
      case 'Opción Múltiple':
      case 'Lista Despegable':
      case 'Escala Lineal':
        return resp;

      case 'Casillas de verificación':
        if (!Array.isArray(resp) || !question.options) return [];
        return question.options
          .map((opt, i) => (resp[i] ? opt.questionOptionGuid : null))
          .filter((v) => v !== null);

      case 'Cuadrícula de Opción Multiple':
        if (resp && typeof resp === 'object') return resp;
        return {};

      default:
        return null;
    }
  }

  GetSurvey(value: string) {
    this.loaderService.show();
    this.service.getSurveyResponseById(value).subscribe(
      (response) => {
        if (response && response.success) {
          this.survey = response.content;
          this.loaderService.hide();
          this.buildForm();
        } else {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al guardar los datos. Intente nuevamente más tarde. ',
          });
        }
      },
      (error) => {
        this.loaderService.hide();
        swal.fire({
          title: 'Error!',
          text:
            error.error ||
            'Error al guardar los datos. Intente nuevamente más tarde. ',
          icon: 'error',
          confirmButtonText: 'Continuar',
        });
      }
    );
  }
}
