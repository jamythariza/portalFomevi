import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAgreement} from '../../models/agreement.interfaces'
import {AgreementService} from '../../services/agreement.service'

@Component({
  selector: 'app-detail-agreement',
  templateUrl: './detail-agreement.component.html',
  styleUrls: ['./detail-agreement.component.css']
})
export class DetailAgreementComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: AgreementService) { }
  loader= true;
  agreements: IAgreement = {} as IAgreement;
  titlePage = "Detalle";

  ngOnInit(): void {
    this.getAgreement();
  }

  getAgreement() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getById(id).subscribe(res => {      
      this.agreements = res
      this.loader = false;
    });   

  }
}
