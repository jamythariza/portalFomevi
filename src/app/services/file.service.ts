import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { IFile } from '../models/file.interface';
import { IGroupFile } from '../models/groupFile.interface';
import { ApiResponse } from '../models/response.interfaces';
import { RequestService } from './request.service';
import { ApiConstants } from '../Core/Constants/apiConstants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(public api: RequestService) {}

  GetFiles(): Observable<ApiResponse> {
    return this.api.req({
      method: 'get',
      api: ApiConstants.GET_RELATIONGROUP,
      uri: environment.apiBaseUrl,
      withCredentials: true,
    });
  }
}
