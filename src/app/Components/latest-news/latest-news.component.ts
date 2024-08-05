import { Component, OnInit } from '@angular/core';
import { NewsService} from '../../services/news.service'
import {NgsRevealConfig} from 'ng-scrollreveal';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.css']
})
export class LatestNewsComponent implements OnInit {

  newsList = Array<any>();

  constructor( config: NgsRevealConfig, private service: NewsService) {   
    config.duration = 1000;
    config.easing = 'cubic-bezier(0.645, 0.045, 0.355, 1)';
    config.origin= 'top' 
    this.get();    
  }
  
  ngOnInit(): void { 
  }

   get(){    
    this.service.getLastest().subscribe(news => {
      this.newsList = news;
    });
  }
}
