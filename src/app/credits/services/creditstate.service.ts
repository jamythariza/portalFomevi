import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiConstants } from 'src/app/Core/Constants/apiConstants';
import {
  ApiResponse,
  ApiResponseSingle,
} from 'src/app/models/response.interfaces';
import { RequestService } from 'src/app/services/request.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CreditstateService {
  constructor(public api: RequestService) {}

  GetCreditState(): Observable<ApiResponse> {
    return this.api.req({
      method: 'get',
      api: ApiConstants.CREDITSTATE_GET,
      uri: environment.apiBaseUrl,
      withCredentials: true,
    });
  }

  getCreditStateById(guid: string): Observable<ApiResponseSingle> {
    if (!guid || guid.toLowerCase() === 'null') {
      console.warn('GUID inválido, no se enviará la petición.');
      return of({
        success: false,
        message: 'GUID inválido',
      } as ApiResponseSingle);
    }

    return this.api.req({
      method: 'get',
      api: `${ApiConstants.CREDITSTATE_BY_ID}/${guid}`,
      uri: environment.apiBaseUrl,
      withCredentials: true,
    });
  }
}
