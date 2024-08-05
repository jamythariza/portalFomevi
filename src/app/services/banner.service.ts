import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, observable} from 'rxjs'
import { IBanner } from '../models/banner.interfaces';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

   //url: string = "https://localhost/portalfomevi/api/"
  url: string = "https://www.fomevi.com/portalfomevi/api/"

  constructor(private http: HttpClient ) { }

  getAll(): Observable<IBanner[]>{

    let dir = this.url + "banner";    
    return this.http.get<IBanner[]>(dir);

  }

}
