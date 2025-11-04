// import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { Router } from '@angular/router';
// import Swal from 'sweetalert2';
// import { catchError, throwError } from 'rxjs';

// export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
//   const token: string | null = localStorage.getItem('token');
//   const router = inject(Router);

//   const authReq = token
//     ? req.clone({
//         setHeaders: { Authorization: `Bearer ${token}` },
//       })
//     : req;

//   return next(authReq).pipe(
//     catchError((error: HttpErrorResponse) => {
//       console.error('Interceptor caught error:', error);

//       // ✅ Si no hay conexión con el backend
//       if (error.status === 0 || error.status === undefined) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Sin conexión con el servidor',
//           text: 'No se pudo establecer comunicación con el servidor. Por favor, verifica tu conexión.',
//         });
//       }

//       // ✅ Token inválido o sesión expirada
//       else if (error.status === 401) {
//         Swal.fire({
//           icon: 'warning',
//           title: 'Sesión expirada',
//           text: 'Tu sesión ha caducado. Inicia sesión nuevamente.',
//           confirmButtonText: 'Iniciar sesión',
//         }).then(() => {
//           localStorage.removeItem('token');
//           router.navigate(['/login']);
//         });
//       }

//       // ✅ Otros errores HTTP
//       else if (error.status >= 400) {
//         Swal.fire({
//           icon: 'error',
//           title: `Error ${error.status}`,
//           text:
//             error.error?.message ||
//             error.message ||
//             'Ha ocurrido un error inesperado. Intenta nuevamente.',
//         });
//       }

//       return throwError(() => error);
//     })
//   );
// };
