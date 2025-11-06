export interface pqrsModel {
  guid: string;
  name: string;
  email: string;
  userIdApproved: string;
  date: string;
  description: string;
  dateSolution: string;
  content?: string | null;
  type: string;
  pqrsState: string;
  pqrsStateGuid: string;
  pqrsType: string;
  pqrsTypeGuid: string;
  pqrsTypeCategory: string;
  pqrsTypeCategoryGuid: string;
  code: string;
  fileBase64: string;
  timeDay: number;
  timeDayCalculate: number;
  document?: string | null;
}

export interface pqrsRequestModel {
  guid?: string | null;
  name?: string | null;
  email?: string | null;
  userGuid?: string | null;
  description?: string | null;
  content?: string | null;
  type?: string | null;
  pqrsStateGuid: string | null;
  pqrsTypeGuid?: string | null;
  pqrsTypeCategoryGuid?: string | null;
  userGuidApproved?: string | null;
  document?: string | null;
}

export interface PqrsUserValidateModel {
  email?: string | null;
  cedulasociado?: string | null;
  nombreCompleto?: string | null;
}

export interface PqrsByDocumentFilterModel {
  code?: string | null;
  document?: string | null;
}
