import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, observable} from 'rxjs'
import { ICreditline } from '../models/creditLine.interface';

@Injectable({
  providedIn: 'root'
})
export class CreditlineService {

  // url: string = "https://localhost/portalfomevi/api/"
  url: string = "https://www.fomevi.com/portalfomevi/api/"

  constructor(private http: HttpClient ) { }

  getAll(): Observable<ICreditline[]>{

    let dir = this.url + "Creditline";    
    return this.http.get<ICreditline[]>(dir);

  }

  getSingle(id: number): Observable<ICreditline>{

    let dir = this.url + "Creditline/"+ id;    
    return this.http.get<ICreditline>(dir);

  }
}
