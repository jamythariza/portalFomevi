import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { IBanner } from '../models/banner.interfaces';
import { ApiResponse } from '../models/response.interfaces';
import { RequestService } from './request.service';
import { ApiConstants } from '../Core/Constants/apiConstants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  //url: string = "https://localhost/portalfomevi/api/"
  url: string = 'https://www.fomevi.com/portalfomevi/api/';

  constructor(private http: HttpClient, public api: RequestService) {}

  getAll(): Observable<IBanner[]> {
    let dir = this.url + 'banner';
    return this.http.get<IBanner[]>(dir);
  }

  getBanners(): Observable<ApiResponse> {
    return this.api.req({
      method: 'get',
      api: ApiConstants.GET_BANNER,
      uri: environment.apiBaseUrl,
      withCredentials: true,
    });
  }
}
