export interface CreditLineResponseModel {
  guid: string | null;
  description: string;
  rangeInitial: number;
  rangeFinally: number;
  biweeklyTerm: number;
  biweeklyInteresRate: number;
  ea: number;
  rangeInitialFormatted: string;
  rangeFinallyFormatted: string;
  biweeklyInteresRateFormatted: string;
  eaFormatted: string;
  guidProfileManagement: string | null;
  descriptionProfileManagement: string | null;
}

export interface UploadedDocument {
  file: File | null;
  required: boolean;
}

export interface ConnectedGroupRequestDto {
  creditId: number | null;
  document?: string;
  description?: string;
}

export interface BackendResponse {
  key: string;
  value: {
    categoryFileId: number;
    descriptionCategory: string;
    guidCategory: string;
    guidCreditline: string;
    descriptionCreditline: string;
    requiered: boolean;
  }[];
}

export interface UploadedDocumentRequerido {
  name: string;
  file: File | null;
  required: boolean;
}
