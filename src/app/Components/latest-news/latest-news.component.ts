import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { NgsRevealConfig } from 'ng-scrollreveal';
import { NewModel } from 'src/app/news/model/new-model';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.css'],
})
export class LatestNewsComponent implements OnInit {
  newsList = Array<any>();
  news: NewModel[] = [];
  day: string = '';
  month: string = '';

  constructor(config: NgsRevealConfig, private service: NewsService) {
    config.duration = 1000;
    config.easing = 'cubic-bezier(0.645, 0.045, 0.355, 1)';
    config.origin = 'top';
    this.get();
  }

  ngOnInit(): void {}

  get() {
    this.service.GetNewsCurrent().subscribe(
      (response) => {
        if (response.success) {
          this.news = response.content;
        }
      },
      (error) => {
        console.error('Error fetching banner data:', error);
      }
    );
  }
}
