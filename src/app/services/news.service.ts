import { Injectable } from '@angular/core';
import { INews } from '../models/news.interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable, of } from 'rxjs';
import { INewsAll } from '../models/news.all.interfaces';
import { IFilters } from '../models/filters.interfaces';
import { ApiResponse, ApiResponseSingle } from '../models/response.interfaces';
import { RequestService } from './request.service';
import { ApiConstants } from '../Core/Constants/apiConstants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  //url: string = "https://localhost/portalfomevi/api/"
  url: string = 'https://www.fomevi.com/portalfomevi/api/';

  constructor(private http: HttpClient, public api: RequestService) {}

  getAll(filter: IFilters): Observable<INewsAll[]> {
    let dir = this.url + 'news' + '?PageNumber=' + filter.PageNumber;
    return this.http.get<INewsAll[]>(dir);
  }

  getById(id: number): Observable<INews> {
    let dir = this.url + 'news/' + id;
    return this.http.get<INews>(dir);
  }

  getLastest() {
    let dir = this.url + 'News/GetLastestNews';
    return this.http.get<INews[]>(dir);
  }

  GetNews(): Observable<ApiResponse> {
    return this.api.req({
      method: 'get',
      api: ApiConstants.GET_NEW,
      uri: environment.apiBaseUrl,
      withCredentials: true,
    });
  }

  GetNewsCurrent(): Observable<ApiResponse> {
    return this.api.req({
      method: 'get',
      api: ApiConstants.GET_NEW_CURRENT,
      uri: environment.apiBaseUrl,
      withCredentials: true,
    });
  }

  getNewById(guid: string): Observable<ApiResponseSingle> {
    if (!guid || guid.toLowerCase() === 'null') {
      console.warn('GUID inválido, no se enviará la petición.');
      return of({
        success: false,
        message: 'GUID inválido',
      } as ApiResponseSingle);
    }

    return this.api.req({
      method: 'get',
      api: `${ApiConstants.GET_NEW_BY_ID}/${guid}`,
      uri: environment.apiBaseUrl,
      withCredentials: true,
    });
  }
}
