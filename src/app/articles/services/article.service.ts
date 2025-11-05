import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  ApiResponse,
  ApiResponseSingle,
} from 'src/app/models/response.interfaces';
import { RequestService } from 'src/app/services/request.service';
import { environment } from 'src/environments/environment';
import { ArticleRequestDto } from '../model/article-request-dto';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  url: string = 'PortalFomeviArticle';
  constructor(public api: RequestService) {}

  GetArticle(): Observable<ApiResponse> {
    return this.api.req({
      method: 'get',
      api: `${this.url}/Article/ArticleGetAll`,
      uri: environment.apiBaseUrl,
      withCredentials: true,
    });
  }

  GetCategoryArticle(): Observable<ApiResponse> {
    return this.api.req({
      method: 'get',
      api: `${this.url}/Category`,
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
      api: `${this.url}/Article/Article_GetById/${guid}`,
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
      api: `${this.url}/Article/ArticleGetByDocument/${documentoId}`,
      uri: environment.apiBaseUrl,
      withCredentials: true,
    });
  }

  createArticle(dto: ArticleRequestDto): Observable<ApiResponse> {
    return this.api.req({
      method: 'post',
      api: `${this.url}/Article/ArticleInsert`,
      uri: environment.apiBaseUrl,
      body: dto,
      withCredentials: true,
    });
  }

  updateArticle(dto: ArticleRequestDto): Observable<ApiResponse> {
    return this.api.req({
      method: 'post',
      api: `${this.url}/Article/ArticleUpdate/`,
      uri: environment.apiBaseUrl,
      body: dto,
      withCredentials: true,
    });
  }
}
