import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, observable} from 'rxjs'
import { IAgreement } from '../models/agreement.interfaces';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AgreementService {

  // url: string = "https://localhost/portalfomevi/api/"
  url: string = "https://www.fomevi.com/portalfomevi/api/"


  constructor(private http: HttpClient,private router: ActivatedRoute ) { }

  getAll(): Observable<IAgreement[]>{

    let dir = this.url + "AgreementGroup/";
    return this.http.get<IAgreement[]>(dir);

  }

  getById(id: number): Observable<IAgreement>{

    let dir = this.url + "AgreementGroup/"+ id;    
    return this.http.get<IAgreement>(dir);

  }

  getFilter(filter: string): Observable<IAgreement[]>{

    let dir = this.url + "AgreementGroup/?filter=" + filter;
    return this.http.get<IAgreement[]>(dir);

  }

  

}
