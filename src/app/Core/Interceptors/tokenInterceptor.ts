import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    // ✅ Clonamos la solicitud y añadimos el token si existe
    const authReq = token
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        })
      : req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // ⚠️ Sin conexión o servidor caído
        if (error.status === 401) {
          Swal.fire({
            icon: 'warning',
            title: 'Sesión expirada',
            text: 'Tu sesión ha caducado. Inicia sesión nuevamente.',
            confirmButtonText: 'Iniciar sesión',
          }).then(() => {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          });
        }

        // ⚠️ Otros errores HTTP
        else if (error.status >= 400) {
          Swal.fire({
            icon: 'error',
            title: `Error ${error.status}`,
            text:
              error.error?.message ||
              error.message ||
              'Ha ocurrido un error inesperado. Intenta nuevamente.',
          });
        }

        return throwError(() => error);
      })
    );
  }
}
