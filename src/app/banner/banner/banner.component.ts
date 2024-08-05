import { Component, OnInit } from '@angular/core';
import { BannerService } from '../../services/banner.service'
import { IBanner} from '../../models/banner.interfaces'
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(private service: BannerService, private router: Router) { }

  banners: IBanner[] = [];

  ngOnInit(): void {
    this.get(); 
  }

  get(){    
    this.service.getAll().subscribe(news => {
      this.banners = news;
    })
  }
  goToLink(event: string){
 
    if(event != undefined){
      if(event.indexOf("http://") == 0 || event.indexOf("https://") == 0){
        window.open(event, '_blank');
      }else{
        this.router.navigate([event]);
      }      
    }
    
  }

}
