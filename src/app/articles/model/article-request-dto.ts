export interface ArticleRequestDto {
  title?: string;
  guid?: string | null;
  description?: string;
  price?: number;
  categoryGuid?: string;
  sellerId?: number | null;
  stateGuid?: string;
  image?: string;
  seller?: SellerDto;
  stateArticle?: string;
  ubication?: string;
  documentoId: string;
  articleImages?: ArticleImageDto[];
}

export interface SellerDto {
  fullName?: string;
  phone?: string;
  email?: string;
}

export interface ArticleImageDto {
  guid?: string | null;
  fileName?: string;
  imageBase64?: string;
  image?: string | null;
}

export interface ArticleDto {
  title?: string;
  guid?: string;
  description?: string;
  price?: number;
  categoryName?: string;
  stateName?: string;
  categoryGuid?: string;
  sellerId?: number | null;
  stateGuid?: string;
  dateCreated?: string;
  dateApproved?: string;
  imageBase64?: string;
  stateArticle?: string;
  ubication?: string;
  seller?: SellerDto;
  articleImages?: ArticleImageDto[];
}

export interface ArticleImageRequestDto {
  articleGuid: string;
  fileName: string;
  ImageBase64?: string;
}
