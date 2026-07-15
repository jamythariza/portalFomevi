import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';
import { IFile } from '../../models/file.interface';
import {
  GroupExternalDto,
  IGroupFile,
  RegulationFileDto,
} from '../../models/groupFile.interface';
import { ApiConstants } from 'src/app/Core/Constants/apiConstants';
import swal from 'sweetalert2';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css'],
})
export class FilesComponent implements OnInit {
  titlePage = 'Guía de Instrucciones y Formularios';
  groups: GroupExternalDto[] = [];
  loader = true;

  constructor(
    private service: FileService,
    private laoderService: LoaderService
  ) {
    this.get();
  }

  ngOnInit(): void {}

  get() {
    this.laoderService.show();

    this.service.GetFiles().subscribe(
      (response) => {
        if (response && response.success) {
          this.groups = response.content || [];
        } else {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.message || ApiConstants.ALERT_ERROR_GET_DATA,
          });
        }
        this.loader = false;
        this.laoderService.hide();
      },
      (error) => {
        this.laoderService.hide();
        this.loader = false;
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: ApiConstants.ALERT_ERROR_GET_DATA,
        });
      }
    );
  }

  download(file: any) {
    if (file && file.content) {
      const linkSource = `data:application/octet-stream;base64,${file.content}`;
      const downloadLink = document.createElement('a');
      downloadLink.href = linkSource;
      downloadLink.download =
        file.regulationFieldName + '.pdf' || 'downloadedFile';
      downloadLink.click();
    } else {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No hay archivo para descargar.',
      });
    }
  }
}
