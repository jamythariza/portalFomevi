export interface ICreditline {
  id: number;
  creditLines: string;
  rangeInitial: number;
  rangeFinally: number;
  term: number;
  interest: number;
  image: string;
  ea: number;
}

export interface CreditLineExternalDto {
  creditLineId?: number | null;
  guid?: string | null;
  description?: string | null;

  rangeInitial: number;
  rangeFinally: number;

  biweeklyTerm: number;

  biweeklyInteresRate: number;
  ea: number;

  profileManagementId?: number | null;
  descriptionProfileManagement?: string | null;
  guidProfileManagement?: string | null;
  image: string;
}
