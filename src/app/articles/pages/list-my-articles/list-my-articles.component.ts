import { Component, OnInit } from '@angular/core';
import { ArticleDto } from '../../model/article-request-dto';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { login } from 'src/app/models/login';
import { environment } from 'src/environments/environment';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-list-my-articles',
  templateUrl: './list-my-articles.component.html',
  styleUrls: ['./list-my-articles.component.css'],
})
export class ListMyArticlesComponent implements OnInit {
  articles: ArticleDto[] = [];
  filteredData: ArticleDto[] = [];
  documentoId!: string;

  constructor(
    private service: ArticleService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.documentoId = this.route.snapshot.paramMap.get('documentoId') ?? '';
    if (this.documentoId && this.documentoId !== 'null') this.Info();
  }

  Info() {
    this.loaderService.show();

    this.service.ArticleGetByDocument(this.documentoId).subscribe({
      next: (response) => {
        if (response.success) {
          this.articles = response.content;
          this.filteredData = response.content;
        } else {
          swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.message ?? '',
          });
        }
        this.loaderService.hide();
      },
      error: (error: any) => {
        swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.message,
        });
        this.loaderService.hide();
      },
    });
  }
}
