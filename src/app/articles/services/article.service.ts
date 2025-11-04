import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  ApiResponse,
  ApiResponseSingle,
} from 'src/app/models/response.interfaces';
import { RequestService } from 'src/app/services/request.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(public api: RequestService) {}

  GetArticle(): Observable<ApiResponse> {
    return this.api.req({
      method: 'get',
      api: 'PortalFomeviArticle/Article/ArticleGetAll',
      uri: environment.apiBaseUrl,
      withCredentials: true,
    });
  }

  GetCategoryArticle(): Observable<ApiResponse> {
    return this.api.req({
      method: 'get',
      api: 'PortalFomeviArticle/Category',
      uri: environment.apiBaseUrl,
      withCredentials: true,
    });
  }

  getArticleById(guid: string): Observable<ApiResponseSingle> {
    if (!guid || guid.toLowerCase() === 'null') {
      console.warn('GUID inválido, no se enviará la petición.');
      return of({
        success: false,
        message: 'GUID inválido',
      } as ApiResponseSingle);
    }

    return this.api.req({
      method: 'get',
      api: `PortalFomeviArticle/Article/Article_GetById/${guid}`,
      uri: environment,
      withCredentials: true,
    });
  }
}
