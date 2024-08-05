import { Injectable } from '@angular/core';
import { INews} from '../models/news.interfaces';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, observable} from 'rxjs'
import { INewsAll } from '../models/news.all.interfaces';
import { IFilters } from '../models/filters.interfaces';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

   //url: string = "https://localhost/portalfomevi/api/"
   url: string = "https://www.fomevi.com/portalfomevi/api/"

  constructor(private http: HttpClient ) { }

  getAll(filter: IFilters): Observable<INewsAll[]>{
    let dir = this.url + "news" + "?PageNumber=" + filter.PageNumber ;    
    return this.http.get<INewsAll[]>(dir);

  }

  getById(id: number): Observable<INews>{

    let dir = this.url + "news/"+ id;    
    return this.http.get<INews>(dir);

  }

  getLastest(){
    let dir = this.url + "News/GetLastestNews";    
    return this.http.get<INews[]>(dir);
  }

}
