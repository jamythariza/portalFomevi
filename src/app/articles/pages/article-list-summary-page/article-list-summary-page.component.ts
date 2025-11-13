import { Component, OnInit } from '@angular/core';
import { ArticleDto } from '../../model/article-request-dto';
import { ArticleService } from '../../services/article.service';
import swal from 'sweetalert2';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-article-list-summary-page',
  templateUrl: './article-list-summary-page.component.html',
  styleUrls: ['./article-list-summary-page.component.css'],
})
export class ArticleListSummaryPageComponent implements OnInit {
  articles: ArticleDto[] = [];
  filteredData: ArticleDto[] = [];
  search: string = '';
  selectedCategory: string = '';

  constructor(
    private service: ArticleService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.loaderService.show();
    this.Info();
  }

  Info() {
    this.service.GetArticle().subscribe(
      (response) => {
        if (response.success) {
          this.articles = response.content.filter(
            (item) => item.stateName === 'Aprobada'
          );
          this.filteredData = this.articles;
        }

        this.loaderService.hide();
      },
      (error) => {
        swal.fire({
          title: 'Error!',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'Continuar',
        });
        this.loaderService.hide();
      }
    );
  }

  filterArticles(): void {
    const term = this.search.trim().toLowerCase();
    this.filtrarDatos(term);
  }

  filtrarDatos(term: string): void {
    this.filteredData = this.articles.filter((item) =>
      [
        item.title,
        item.categoryName,
        item.categoryGuid,
        item.stateArticle,
      ].some((field) =>
        (field?.toLowerCase() ?? '').includes(term.toLowerCase())
      )
    );
  }

  onCategoryChange(value: string): void {
    this.selectedCategory = value;
    this.filtrarDatos(value);
  }

  resetFilter(): void {
    this.onCategoryChange('');
    this.search = '';
    this.Info();
  }
}
