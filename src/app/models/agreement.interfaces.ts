export interface IAgreement {
  id: number;
  idAgreement: number;
  title: string;
  description: string;
  url: string;
  namFile: string;
  image: string;
  dateCreated: string;
  file: string;
  typeDestiny: number;
  typeFile: string;
  assesor: string;
  phone: string;
  direction: string;
  email: string;
  titleAgreement: string;
  mobile: string;
  dateFormatter: string;
}

export interface CategoriesExternalDto {
  name: string;
  image?: string | null; // byte[] → string (base64)
  guid?: string | null; // Guid → string
  order?: number | null;
  imageBase64?: string | null;
  agreements: AgreementExternalDto[];
}

export interface AgreementExternalDto {
  name: string;
  description: string;
  image?: string | null;
  dateCreation: string;
  guid?: string | null;
  type?: string | null;
  asesor: string;
  phone: string;
  address: string;
  mail: string;
  categoryGuid?: string | null;
  stateGuid?: string | null;
  stateName?: string | null;
  nameFile?: string | null;
  typeFile?: string | null;
  content?: string | null;
  link?: string | null;
  imageBase64?: string | null;
  nameCategory: string;
}
