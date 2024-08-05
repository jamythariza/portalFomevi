import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, observable} from 'rxjs'
import { IFile } from '../models/file.interface';
import {IGroupFile} from '../models/groupFile.interface'

@Injectable({
  providedIn: 'root'
})
export class FileService {

   // url: string = "https://localhost/portalfomevi/api/"
   url: string = "https://www.fomevi.com/portalfomevi/api/"

  constructor(private http: HttpClient ) { }

  getFiles(): Observable<IFile[]>{

    let dir = this.url + "file";    
    return this.http.get<IFile[]>(dir);

  }

  getGroups(): Observable<IGroupFile[]>{

    let dir = this.url + "GroupFile";    
    return this.http.get<IGroupFile[]>(dir);

  }
}
