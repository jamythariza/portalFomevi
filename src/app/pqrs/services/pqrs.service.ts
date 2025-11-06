import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiConstants } from 'src/app/Core/Constants/apiConstants';
import {
  ApiResponse,
  ApiResponseSingle,
} from 'src/app/models/response.interfaces';
import { RequestService } from 'src/app/services/request.service';
import { environment } from 'src/environments/environment';
import {
  PqrsByDocumentFilterModel,
  pqrsRequestModel,
} from '../model/pqrs-model';

@Injectable({
  providedIn: 'root',
})
export class PqrsService {
  constructor(public api: RequestService) {}

  GetPqrsByDocument(
    filter: PqrsByDocumentFilterModel
  ): Observable<ApiResponse> {
    let queryParams: any = {};
    if (filter.code) queryParams.code = filter.code;
    if (filter.document) queryParams.document = filter.document;

    return this.api.req({
      method: 'get',
      api: `${ApiConstants.GET_PQRSBY_DOCUMENT}`,
      uri: environment.apiBaseUrl,
      params: queryParams, // 👈 aquí le pasamos los query params al wrapper
      withCredentials: true,
    });
  }

  getPqrsType(): Observable<ApiResponse> {
    return this.api.req({
      method: 'get',
      api: ApiConstants.GET_PQRSTYPE,
      uri: environment.apiBaseUrl,
      withCredentials: true,
    });
  }

  PqrsTypeCategoryGetByPqrsTypeId(guid: string): Observable<ApiResponseSingle> {
    if (!guid || guid.toLowerCase() === 'null') {
      console.warn('GUID inválido, no se enviará la petición.');
      return of({
        success: false,
        message: 'GUID inválido',
      } as ApiResponseSingle);
    }

    return this.api.req({
      method: 'get',
      api: `${ApiConstants.GET_PQRSTYPECATEGORY}/${guid}`,
      uri: environment.apiBaseUrl,
      withCredentials: true,
    });
  }

  createPqrs(role: pqrsRequestModel): Observable<ApiResponse> {
    return this.api.req({
      method: 'post',
      api: ApiConstants.INSERT_PQRS,
      uri: environment.apiBaseUrl,
      body: role,
      withCredentials: true,
    });
  }
}
