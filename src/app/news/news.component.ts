import { Component, OnInit } from '@angular/core';
import { NewsService} from '../services/news.service'
import {INewsAll} from '../models/news.all.interfaces'
import { IFilters} from '../models/filters.interfaces'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

newsList: INewsAll[] = [];
titlePage = "Novedades";
loader = true;
public page!: number;

filter : IFilters = { 
  TotalCount:0, 
  PageSize:0,
  CurrentPage:0,
  TotalPages:0,
  HasNextPage  : false,
  HasPreviousPage  : false,
  NextPageUrl :'',
  PreviousPageUrl : '',
  PageNumber:1
}

  constructor(  private service: NewsService) {
    this.get(this.filter);
  }
  
  ngOnInit(): void { 
  }

  get(filters: IFilters){
    this.service.getAll(filters).subscribe(news => {
      this.newsList = news;
      this.loader = false;
    })
  }

  next(){
    this.filter.PageNumber = this.filter.PageNumber + 1;
    this.get(this.filter);
  }

  previous(){
    this.filter.PageNumber = this.filter.PageNumber - 1;
    this.get(this.filter);
  }

}
