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
  CreditRequestModel,
  CreditsRequestDto,
} from '../models/credit-form-model';

@Injectable({
  providedIn: 'root',
})
export class CreditService {
  constructor(public api: RequestService) {}

  GetCredits(documentId: string): Observable<ApiResponse> {
    return this.api.req({
      method: 'get',
      api: `${ApiConstants.CREDIT_GET}/${documentId}`,
      uri: environment.apiBaseUrl,
      withCredentials: true,
    });
  }

  createCredit(role: CreditsRequestDto): Observable<ApiResponse> {
    return this.api.req({
      method: 'post',
      api: ApiConstants.CREDIT_INSERT,
      uri: environment.apiBaseUrl,
      body: role,
      withCredentials: true,
    });
  }
}
