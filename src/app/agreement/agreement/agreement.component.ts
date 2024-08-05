import { Component, Input, OnInit, EventEmitter  } from '@angular/core';
import { AgreementService } from '../../services/agreement.service';
import { IAgreement} from '../../models/agreement.interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css']
})
export class AgreementComponent implements OnInit {
  constructor(private route: ActivatedRoute, private service: AgreementService,) { }


  loader = true;
  agreements: IAgreement[] = [];
  agreementsAll: IAgreement[] = [];
  titlePage = "Convenios";
  filterActive: string = "";

  ngOnInit(): void {
    this.loadAgreement(); 
  }

loadAgreement(){

    this.service.getAll().subscribe(res => {
      this.agreementsAll = res;
      this.get();
    })
}

  get(){  

    const filter = this.route.snapshot.paramMap.get('filter');

    this.filter(filter);

  }

  filter(event: any){
    /*const filter = event.target.innerText   */
    this.filterActive= event.toUpperCase()   
    const results: IAgreement[] = [];
    this.loader = true;

    
    if(this.filterActive =="TODOS"){
      this.agreements =this.agreementsAll;
      this.loader = false; 
      return;
    }else{
      this.agreementsAll.forEach(element => {
        if(element.titleAgreement == event.toUpperCase()){
          results.push(element);
        }
      }); 

      this.agreements = results;
    }
    
      this.loader = false;
   
  }

}


