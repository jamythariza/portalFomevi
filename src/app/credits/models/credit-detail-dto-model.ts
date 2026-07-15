// credit-detail.dto.ts

export interface CreditDetailDto {
  creditId: number;
  creditLineId: number;
  stateId: number;
  nameAsociate: string;
  document: string;
  guid: string; // Guid en .NET -> string en TS
  code: string;
  amount: number;
  dateCreate: string; // DateTime -> string (ISO 8601 desde API)
  dateApproved?: string; // DateTime? -> string | undefined
  dateAnalysis?: string;
  term: number;
  quota: number;
  termDescription: string;
  comment: string;
  phone: string;
  email: string;
  pagare: string;
  score: number;
  documentCosigner: string;
  salary: number;
  typeContract: string;
  typeIdentification: string;
  stratum: string;
  dateAdmissionFomevi: string;
  dateAdmissionCompany: string;
  typeHousing: string;
  // CreditLine
  biweeklyInteresRate: number;
  creditLineDescription: string;
  creditLineGuid: string;

  // State
  stateGuid: string;
  stateDescription: string;

  // ConnectedGroup
  connectedGroupGuid?: string;
  connectedGroupDocument: string;
  connectedGroupDescription: string;
  porcentage: number;
  // Cliente
  nameComplete: string;

  // FinancialData
  financialInfo: FinancialDto;
  documents: DocumentDto[];
  comments: CommentDto[];
  directives: DirectivesDto[];
  additionaInformation: AdditionaInformation;
  bonus: bonusDto;
  connectedGroupDto: connectedGroupDto;
  credits: creditsDto[];
  contributions: ContributionsDto;
  deductions: DeductionsDto;
  contributionsFomevi: ContributionsFomeviDto;
}

export interface DocumentDto {
  documentGuid: string;
  documentName: string;
  type: string;
  content: string; // byte[] en .NET -> base64 string en JSON
  documentCreate: string;
}

export interface CommentDto {
  commentId: number;
  userId: number | null;
  nameComplete: string;
  username: string;
  commentGuid: string;
  parentId?: number;
  description: string;
  dateCreate: string;
  replies: CommentDto[];
}

export interface FinancialDto {
  financialDataGuid: string;
  creditId: number;
  contributions: number | null;
  currentFomeviLoans: number | null;
  otherPayrollDeductions: number | null;
  biweeklyTotal: number | null;
  monthlyTotal: number | null;
  quotaOtherEntities: number | null;
  quotaCurrentTicketOfficeLoan: number | null;
  quotaCurrentTicketOfficeLoans: number | null;
  externalConsumerDebt: number | null;
  externalHousingDebt: number | null;
  levelIndebtedness: number | null;
  totalMonthlyDeductions: number | null;
  totalRequired: number | null;
  otherEmploymentIncomeMonth: number | null;
}

export interface DirectivesDto {
  creditGuid: string;
  creditlineGuid: string;
  creditlineDescription: string;
  userGuid: string;
  nameComplete: string;
  isPrincipal: boolean;
  completed: boolean;
  isAssigned: boolean;
  stateGuidApproval: string;
  stateDescriptionApproval: string;
}

export interface AdditionaInformation {
  guid: string;
  otherMonthlyIncome: number | null;
  familyIncome: number | null;
  realEstate: number | null;
  vehicle: number | null;
  fomeviRating: string;
  cifinRating: number | null;
  numberLoans: number | null;
  typeGuarantee: string;
  severanceFund: string;
  severanceBalance: number | null;
  financialDescription: string;
  assets: number | null;
  liabilities: number | null;
  equity: number | null;
}

export interface bonusDto {
  guid: string;
  dateBonusJune: string;
  dateBonusDecember: string;
  valueBonusJune: number | null;
  valueBonusDecember: number | null;
}

export interface connectedGroupDto {
  guid: string;
  document: string;
  description: string;
}

export interface creditsDto {
  pagare: number | null;
  plazo: number | null;
  saldocapital: number | null;
  formapago: string | null;
  cuotainteres: number | null;
  nombredestino: string | null;
}

export interface ContributionsDto {
  perOrd: number | null;
  extord: number | null;
  per1: number | null;
  totalSuma: number | null;
}

export interface DeductionsDto {
  totalDeductionsBoxOffice: number | null;
}

export interface ContributionsFomeviDto {
  valor: number;
  detalle?: string;
  fechatrabajo?: string;
  codlinea?: string;
  documento?: string;
  descuento?: string;
}

export interface CreditListModel {
  guid: string;
  code: string;
  document: string;
  nameComplete: string;
  creditlineDescription: string;
  companyName: string;
  creditlineGuid: string;
  dateCreate: Date;
  dateAnalysis: Date;
  stateGuid: string;
  stateDescription: string;
}
