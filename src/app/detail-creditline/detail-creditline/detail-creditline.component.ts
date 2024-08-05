import { Component, OnInit,Output, EventEmitter  } from '@angular/core';
import {CreditlineService} from '../../services/creditline.service';
import { ActivatedRoute } from '@angular/router';
import {ICreditline} from '../../models/creditLine.interface'

@Component({
  selector: 'app-detail-creditline',
  templateUrl: './detail-creditline.component.html',
  styleUrls: ['./detail-creditline.component.css']
})
export class DetailCreditlineComponent implements OnInit {
  @Output()
propagar = new EventEmitter<string>();
  credits: ICreditline = {} as ICreditline;
  titlePage = "Detalle";
  
  constructor(private service: CreditlineService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getSingle();
  }

  getSingle(){
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getSingle(id).subscribe(res => {
      this.credits= res
    });   

  }
  
  procesaPropagar(id: number) {
    this.getSingle();
  }

}
