import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from './request.service';
import { ApiResponse } from '../models/response.interfaces';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ExternalService {
  constructor(public api: RequestService) {}

  GetUserSingleByDocument(doc: number): Observable<ApiResponse> {
    return this.api.req({
      method: 'get',
      api: `/PortalFomeviUsers/UserExternal/GetUserSingleByDocument?doc=${doc}`,
      uri: environment.apiBaseUrl,
      withCredentials: true,
    });
  }
}
