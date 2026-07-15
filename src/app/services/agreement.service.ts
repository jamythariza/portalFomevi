import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable, of } from 'rxjs';
import { IAgreement } from '../models/agreement.interfaces';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from './request.service';
import { ApiResponse, ApiResponseSingle } from '../models/response.interfaces';
import { ApiConstants } from '../Core/Constants/apiConstants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AgreementService {
  constructor(private api: RequestService, private router: ActivatedRoute) {}

  // getAll(): Observable<IAgreement[]>{

  //   let dir = this.url + "AgreementGroup/";
  //   return this.http.get<IAgreement[]>(dir);

  // }

  // getById(id: number): Observable<IAgreement> {
  //   let dir = this.url + 'AgreementGroup/' + id;
  //   return this.http.get<IAgreement>(dir);
  // }

  // getFilter(filter: string): Observable<IAgreement[]> {
  //   let dir = this.url + 'AgreementGroup/?filter=' + filter;
  //   return this.http.get<IAgreement[]>(dir);
  // }

  getAll(): Observable<ApiResponse> {
    return this.api.req({
      method: 'get',
      api: ApiConstants.GET_CATEGORIES,
      uri: environment.apiBaseUrl,
      withCredentials: true,
    });
  }

  GetCategotyByID(guid: string): Observable<ApiResponseSingle> {
    if (!guid || guid.toLowerCase() === 'null') {
      console.warn('GUID inválido, no se enviará la petición.');
      return of({
        success: false,
        message: 'GUID inválido',
      } as ApiResponseSingle);
    }

    return this.api.req({
      method: 'get',
      api: `${ApiConstants.GET_CATEGORIES_BYID}/${guid}`,
      uri: environment.apiBaseUrl,
      withCredentials: true,
    });
  }
}
