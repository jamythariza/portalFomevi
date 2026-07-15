export interface IGroupFile {
  id: number;
  nameGroup: string;
  ubication: string;
  files: [
    {
      id: number;
      groupId: number;
      nameFile: string;
      nameFile2: string;
    }
  ];
}

export interface GroupExternalDto {
  regulationGroupName?: string;
  regulationGroupGuid?: string; // Guid → string en TS
  relationFile?: RegulationFileDto[];
}

export interface RegulationFileDto {
  regulationFieldName?: string;
  type?: string;
  content?: Uint8Array | string; // byte[] → Uint8Array o Base64 string
  dateCreation?: string | Date; // DateTime → string o Date
  regulationFielGuid?: string;
  regulationGroupFileGuid?: string;
}
