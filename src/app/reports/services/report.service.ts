import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiConstants } from 'src/app/Core/Constants/apiConstants';
import {
  ApiResponse,
  ApiResponseSingle,
} from 'src/app/models/response.interfaces';
import { RequestService } from 'src/app/services/request.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(public api: RequestService) {}

  CertificateReport(
    document: string,
    ciudad: string,
    dirigido: string,
    intTipo: string,
    tipoDato: string = 'PDF',
    visualizacion: string = 'inline'
  ): Observable<Blob> {
    const url = `${ApiConstants.CREATE_REPORT_CERTIFCATE}/Certificate/${document}/${ciudad}/${dirigido}/${intTipo}/${tipoDato}/${visualizacion}`;

    return this.api.req({
      method: 'get',
      api: url,
      uri: environment.apiBaseUrl,
      responseType: 'blob',
      observe: 'body',
      withCredentials: true,
    });
  }

  DiscriminatedReport(
    document: string,
    year: string,
    month: string,
    tipoDato: string = 'PDF',
    visualizacion: string = 'inline'
  ): Observable<Blob> {
    const url = `${ApiConstants.CREATE_REPORT_DISCRIMINATION}/Discrimination/${document}/${year}/${month}/${tipoDato}/${visualizacion}`;

    return this.api.req({
      method: 'get',
      api: url,
      uri: environment.apiBaseUrl,
      responseType: 'blob',
      observe: 'body',
      withCredentials: true,
    });
  }
}
