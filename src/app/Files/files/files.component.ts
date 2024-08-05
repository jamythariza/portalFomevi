import { Component, OnInit } from '@angular/core';
import { FileService} from '../../services/file.service'
import {IFile} from '../../models/file.interface'
import {IGroupFile} from '../../models/groupFile.interface'

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  titlePage = "Guía de Instrucciones y Formularios"
  groups: IGroupFile[] = [];
  files: IFile[] = [];
  loader = true;

    constructor(  private service: FileService) { 
      this.get();
    }

  ngOnInit(): void {
  }

  get(){    
    this.service.getGroups().subscribe(news => {
      this.groups = news;
      this.loader = false;
    })
  }

}
