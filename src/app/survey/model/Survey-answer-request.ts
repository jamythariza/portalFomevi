export interface SurveyAnswerRequest {
  surveyGuid?: string;
  idDocumento?: string;
  groups?: GroupDto[];
}

export interface GroupDto {
  guidGroup?: string;
  titleGroup?: string;
  questions?: QuestionDto[];
}

export interface QuestionDto {
  guidQuestion?: string;
  descriptionQuestion?: string;
  questionType?: AnswerQuestionTypeDto;
  options?: AnswerQuestionOptionDto[]; // Para opciones tipo checkbox o lista
  optionScale?: AnswerQuestionOptionScaleDto[];
  optionMatrix?: AnswerQuestionOptionMatrixDto[];
  response?: string | number | boolean | string[] | Record<string, string>; // Respuesta flexible
}

export interface AnswerQuestionOptionDto {
  questionOptionGuid?: string;
  questionOptionText?: string;
}

export interface AnswerQuestionOptionScaleDto {
  questionOptionScaleGuid?: string;
  optionStart?: number;
  optionEnd?: number;
}

export interface AnswerQuestionOptionMatrixDto {
  questionOptionMatrixGuid?: string;
  matrixIsActive?: boolean;
  matrixRowText?: string;
  matrixColumnText?: string;
}

export interface AnswerQuestionTypeDto {
  guidQuestionType: string;
  descriptionQuestionType?: string;
}

export interface SurveyValidateUserDto {
  surveyGuid?: string;
  title?: string;
  hasResponded: boolean;
}
