import { Component, OnInit, Input, EventEmitter  } from '@angular/core';
import {NgsRevealConfig} from 'ng-scrollreveal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agreement-component',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css']
})

export class AgreementComponentComponent implements OnInit {

  constructor(
    config: NgsRevealConfig,
    private router: Router) 
    { 
      config.duration = 1000;
      config.easing = 'cubic-bezier(0.645, 0.045, 0.355, 1)';
      config.origin= 'top'
    }

  ngOnInit(): void {
  }

onDetail(agreement: string){
  this.router.navigate(['/agreement/'+ agreement]);
}

}
