import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { INewsAll } from '../models/news.all.interfaces';
import { IFilters } from '../models/filters.interfaces';
import { NewModel } from './model/new-model';
import { ApiConstants } from '../Core/Constants/apiConstants';
import swal from 'sweetalert2';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  news: NewModel[] = [];
  newsList: INewsAll[] = [];
  titlePage = 'Novedades';
  loader = true;
  public page!: number;
  safeDescription: SafeHtml | null = null;
  safeDescriptions: SafeHtml[] = [];
  filter: IFilters = {
    TotalCount: 0,
    PageSize: 0,
    CurrentPage: 0,
    TotalPages: 0,
    HasNextPage: false,
    HasPreviousPage: false,
    NextPageUrl: '',
    PreviousPageUrl: '',
    PageNumber: 1,
  };

  constructor(private service: NewsService, private sanitizer: DomSanitizer) {
    // this.get(this.filter);
    this.getInfo();
  }

  ngOnInit(): void {}

  get(filters: IFilters) {
    this.service.getAll(filters).subscribe((news) => {
      this.newsList = news;
      this.loader = false;
    });
  }

  next() {
    this.filter.PageNumber = this.filter.PageNumber + 1;
    this.get(this.filter);
  }

  previous() {
    this.filter.PageNumber = this.filter.PageNumber - 1;
    this.get(this.filter);
  }

  getInfo() {
    this.service.GetNews().subscribe(
      (response) => {
        if (response.success) {
          this.loader = false;
          this.news = response.content;

          this.safeDescriptions = this.news.map((n) =>
            this.sanitizer.bypassSecurityTrustHtml(n.description)
          );
        }
      },
      (error) => {
        this.loader = false;
        swal.fire({
          title: 'Error!',
          text: ApiConstants.ALERT_ERROR_SOPORT_TECHNICAL,
          icon: 'error',
          confirmButtonText: 'Continuar',
        });
      }
    );
  }
}
