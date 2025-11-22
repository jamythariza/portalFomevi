import { Injectable } from '@angular/core';
import { Observable, observable, of } from 'rxjs';
import { RequestService } from './request.service';
import { ApiResponse, ApiResponseSingle } from '../models/response.interfaces';
import { ApiConstants } from '../Core/Constants/apiConstants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CreditlineService {
  constructor(public api: RequestService) {}

  getAll(): Observable<ApiResponse> {
    return this.api.req({
      method: 'get',
      api: ApiConstants.GET_CREDITLINE,
      uri: environment.apiBaseUrl,
      withCredentials: true,
    });
  }

  GetCreditLineByID(guid: string): Observable<ApiResponseSingle> {
    if (!guid || guid.toLowerCase() === 'null') {
      console.warn('GUID inválido, no se enviará la petición.');
      return of({
        success: false,
        message: 'GUID inválido',
      } as ApiResponseSingle);
    }

    return this.api.req({
      method: 'get',
      api: `${ApiConstants.GET_CREDITLINE}/${guid}`,
      uri: environment.apiBaseUrl,
      withCredentials: true,
    });
  }
}
