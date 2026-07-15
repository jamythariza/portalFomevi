export interface CreditsRequestDto {
  creditRequestDto: CreditRequestDto;
  documentsRequestDto: DocumentRequestDto[];
  connectedGroupRequestDto: ConnectedGroupRequestDto;
  financialDataRequestDto: FinancialDataRequestDto;
}

export interface CreditRequestDto {
  creditline: string;
  stateGuid: string;
  creditlineGuid: string | null;
  document: string | null;
  term: number;
  amount: number;
  quota: number;
  termDescription: string;
  comments: string;
  phone: string;
  email: string;
  pagare: string;
}

export interface DocumentRequestDto {
  creditId: number | null;
  name: string;
  type: string;
  content?: string | null;
}

export interface ConnectedGroupRequestDto {
  creditId: number | null;
  document?: string;
  description?: string;
}

export interface FinancialDataRequestDto {
  creditId: number | null;
  assets: number;
  liabilities: number;
  equity: number;
}

export interface CreditRequestModel {
  creditLineDescription: string | null;
  companyName: string | null;
  code: string | null;
  state: string | null;
  searchTerm: string | null;
}

export interface UploadedDocument {
  file: File | null;
  required: boolean;
}
