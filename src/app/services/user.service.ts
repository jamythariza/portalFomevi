import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, observable} from 'rxjs'
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // url: string = "https://localhost/portalfomevi/api/"
  url: string = "https://www.fomevi.com/portalfomevi/api/"

  constructor(private http: HttpClient ) { }

  getAll(): Observable<IUser[]>{

    let dir = this.url + "User";    
    return this.http.get<IUser[]>(dir);

  }

}
