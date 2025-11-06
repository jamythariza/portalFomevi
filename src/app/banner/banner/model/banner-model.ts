export interface BannerModel {
  guid: string | null;
  image: string | null;
  urlSite: string;
  stateName?: string;
  stateGuid: string;
  imageBase64?: string;
  order: number;
}
