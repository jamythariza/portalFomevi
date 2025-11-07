import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private readonly headers = {};
  private readonly contentType = 'application/json';

  constructor(private httpClient: HttpClient, private router: Router) {}

  req(params: any = {}, file?: boolean, options?: any): Observable<any> {
    const optionItems = {
      method: params.method,
      headers: this.headers,
    };

    let url = `${params.uri}${params.api}`;

    if (options) {
      optionItems.headers = options.headers;
    }

    return this.httpClient
      .request(optionItems.method, url, {
        body: params.body,
        headers: optionItems.headers,
        observe: 'response',
        params: params.params,
      })
      .pipe(
        map((res: any) => {
          if (res.body && res.body.token) {
            this.setToken(res.body.token);
            this.setUsersession(res.body.user.guid);
          }
          return res.body;
        }),
        catchError((error: any) => {
          let message = 'Ha ocurrido un error inesperado';

          // ✅ Caso 401 o token expirado
          if (error.status === 401 || error.error.isTrusted) {
            swal;
            // .fire({
            //   icon: 'warning',
            //   title: 'Inicio de Sesión',
            //   text: error.error.message,
            // })
            // .then(() => {
            //   localStorage.removeItem('token');
            //   this.router.navigate(['/login']);
            // });
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
            return throwError(() => new Error(message));
          }

          // ✅ Otros errores enviados por el backend
          if (error.error) {
            // Puede ser string o JSON { message: '...' }
            message =
              typeof error.error === 'string'
                ? error.error
                : error.error.message || JSON.stringify(error.error);

            swal.fire({
              icon: 'error',
              title: `Error ${error.status}`,
              text: message,
            });
          } else {
            swal.fire({
              icon: 'error',
              title: 'Error',
              text: message,
            });
          }

          return throwError(() => new Error(message));
        })
      );
  }

  // Guardar el token al hacer login
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  setUsersession(user: string): void {
    localStorage.setItem('usersession', user);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('access_token');
  }
}
