import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { IUser } from '../models/user.interface';
import { ApiResponse } from '../models/response.interfaces';
import { RequestService } from './request.service';
import { ApiConstants } from '../Core/Constants/apiConstants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public api: RequestService) {}

  getAll(): Observable<ApiResponse> {
    return this.api.req({
      method: 'get',
      api: ApiConstants.GET_USERS,
      uri: environment.apiBaseUrl,
      withCredentials: true,
    });
  }
}
