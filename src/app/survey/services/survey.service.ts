import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  ApiResponse,
  ApiResponseSingle,
} from 'src/app/models/response.interfaces';
import { RequestService } from 'src/app/services/request.service';
import { environment } from 'src/environments/environment';
import { SurveyAnswerRequest } from '../model/Survey-answer-request';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  baseUrl: string = 'PortalFomeviSurvey/';
  constructor(public api: RequestService) {}

  getSurveyResponseById(guid: string): Observable<ApiResponseSingle> {
    if (!guid || guid.toLowerCase() === 'null') {
      console.warn('GUID inválido, no se enviará la petición.');
      return of({
        success: false,
        message: 'GUID inválido',
      } as ApiResponseSingle);
    }

    return this.api.req({
      method: 'get',
      api: `${this.baseUrl}survey/GetSurveyResponse/${guid}`,
      uri: environment.apiBaseUrl,
      withCredentials: true,
    });
  }

  getSurveyByDocumentId(
    guid: string,
    documentId: string
  ): Observable<ApiResponseSingle> {
    if (!guid || guid.toLowerCase() === 'null') {
      console.warn('GUID inválido, no se enviará la petición.');
      return of({
        success: false,
        message: 'GUID inválido',
      } as ApiResponseSingle);
    }

    return this.api.req({
      method: 'get',
      api: `${this.baseUrl}Answer/GetSurveyValidateUser/${guid}/${documentId}`,
      uri: environment.apiBaseUrl,
      withCredentials: true,
    });
  }

  createSurveyAnswer(role: SurveyAnswerRequest): Observable<ApiResponse> {
    return this.api.req({
      method: 'post',
      api: `${this.baseUrl}Answer/InsertSurveyAnswer`,
      uri: environment.apiBaseUrl,
      body: role,
      withCredentials: true,
    });
  }
}
