export interface NewModel {
  name: string;
  guid: string | null;
  description: string;
  dateCreation: string;
  stateGuid: string;
  stateName?: string;
  image: string;
  content: string | null;
  nameFile: string | null;
  typeFile: string | null;
  link: string | null;
  imageBase64?: string;
}
