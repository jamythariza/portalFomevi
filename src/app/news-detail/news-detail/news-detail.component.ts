import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NewsService} from '../../services/news.service';
import { INews } from 'src/app/models/news.interfaces';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

  detailId = 0;
  newsList: INews = {} as INews;
  title = "";
  dateNewsList = "";
  description = "";
  image = "";
  fileName = "";
  titlePage = "Detalle";
  loader = true;
  Url= "";

  constructor(
    private route: ActivatedRoute,   
    private service: NewsService
    ) {} 

  ngOnInit(): void {
    this.getNew();
  }

  getNew() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.detailId = id;

    this.service.getById(id).subscribe(res => {
      this.newsList.data = res.data
      this.title = res.data.title;
      this.dateNewsList = res.data.dateNewsList;
      this.fileName = res.data.fileName;
      this.description = res.data.descriptionFinally;
      this.image = res.data.image;
      this.loader = false;
      this.Url = res.data.url;

    });   
  }
  
}
