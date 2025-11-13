import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  ApiResponse,
  ApiResponseSingle,
} from 'src/app/models/response.interfaces';
import { RequestService } from 'src/app/services/request.service';
import { environment } from 'src/environments/environment';
import { ArticleRequestDto } from '../model/article-request-dto';
import { ApiConstants } from 'src/app/Core/Constants/apiConstants';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(public api: RequestService) {}

  GetArticle(): Observable<ApiResponse> {
    return this.api.req({
      method: 'get',
      api: `${ApiConstants.GET_ARTICLES}`,
      uri: environment.apiBaseUrl,
      withCredentials: true,
    });
  }

  GetCategoryArticle(): Observable<ApiResponse> {
    return this.api.req({
      method: 'get',
      api: `${ApiConstants.GET_ARTICLES}`,
      uri: environment.apiBaseUrl,
      withCredentials: true,
    });
  }

  getArticleById(guid: string): Observable<ApiResponseSingle> {
    if (!guid || guid.toLowerCase() === 'null') {
      return of({
        success: false,
        message: 'GUID inválido',
      } as ApiResponseSingle);
    }

    return this.api.req({
      method: 'get',
      api: `${ApiConstants.GET_ARTICLES}/${guid}`,
      uri: environment.apiBaseUrl,
      withCredentials: true,
    });
  }

  ArticleGetByDocument(documentoId: string): Observable<ApiResponse> {
    if (!documentoId || documentoId.toLowerCase() === 'null') {
      return of({
        success: false,
        message: 'GUID inválido',
      } as ApiResponseSingle);
    }

    return this.api.req({
      method: 'get',
      api: `${ApiConstants.GET_ARTICLESBYDOCUMENT}/${documentoId}`,
      uri: environment.apiBaseUrl,
      withCredentials: true,
    });
  }

  createArticle(dto: ArticleRequestDto): Observable<ApiResponse> {
    return this.api.req({
      method: 'post',
      api: `${ApiConstants.GET_ARTICLE_INSERT}`,
      uri: environment.apiBaseUrl,
      body: dto,
      withCredentials: true,
    });
  }

  updateArticle(dto: ArticleRequestDto): Observable<ApiResponse> {
    return this.api.req({
      method: 'post',
      api: `${ApiConstants.GET_ARTICLE_UPDATE}`,
      uri: environment.apiBaseUrl,
      body: dto,
      withCredentials: true,
    });
  }
}
