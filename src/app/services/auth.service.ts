import { Injectable } from '@angular/core';
import { login } from '../models/login';
import { Observable } from 'rxjs';
import { RequestService } from './request.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public api: RequestService) {}

  login(credentials: login): Observable<boolean> {
    return this.api.req({
      method: 'post',
      api: 'PortalFomeviToken/api/Token/Authentication',
      uri: environment.apiBaseUrl,
      body: credentials,
    });
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('access_token');
  }
}
