// survey-result.model.ts

export interface SurveyResultDto {
  guidSurvey: string;
  title: string;
  descriptionSurvey: string;
  dateInitial: Date;
  dateFinally: Date;
  groups: SurveyGroupDto[];
}

export interface SurveyGroupDto {
  guidGroup: string;
  titleGroup: string;
  descriptionGroup: string;
  questions: SurveyQuestionDto[];
}

export interface SurveyQuestionDto {
  guidQuestion: string;
  titleQuestion: string;
  descriptionQuestion: string;
  isMandatory: boolean;
  order: number;
  questionType: SurveyQuestionTypeDto | null;
  options: SurveyQuestionOptionDto[];
  optionScales: SurveyQuestionOptionScaleDto[];
  optionMatrix: SurveyQuestionOptionMatrixDto[];
}

export interface SurveyQuestionTypeDto {
  guidQuestionType: string | null;
  descriptionQuestionType: string;
}

export interface SurveyQuestionOptionDto {
  questionOptionId: number | null;
  questionOptionGuid: string | null;
  questionOptionText: string;
}

export interface SurveyQuestionOptionScaleDto {
  questionOptionScaleId: number;
  questionOptionScaleGuid: string | null;
  optionStart: number;
  optionEnd: number;
}

export interface SurveyQuestionOptionMatrixDto {
  questionOptionMatrixId: number | null;
  questionOptionMatrixGuid: string | null;
  matrixRowText: string;
  matrixColumnText: string;
  matrixIsActive: boolean | null;
}
