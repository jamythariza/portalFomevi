import { Component, OnInit } from '@angular/core';
import { ArticleDto, ArticleImageDto } from '../../model/article-request-dto';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-article-view-page',
  templateUrl: './article-view-page.component.html',
  styleUrls: ['./article-view-page.component.css'],
})
export class ArticleViewPageComponent implements OnInit {
  guid!: string;
  article: ArticleDto | null = null;
  articleImages: ArticleImageDto[] = [];
  safeDescription: SafeHtml | null = null;

  constructor(
    private service: ArticleService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.guid = this.route.snapshot.paramMap.get('guid') ?? '';

    if (this.guid && this.guid !== 'null') {
      this.getInfo();
    }
  }

  getInfo() {
    const guid = this.guid ? this.guid : '';
    this.service.getArticleById(guid).subscribe(
      (response) => {
        if (response) {
          this.article = response.content || null;
          this.articleImages = [...(this.article?.articleImages || [])];

          if (this.article?.description) {
            this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(
              this.article.description
            );
          }
        }
      },
      (error) => {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error,
        });
      }
    );
  }
}
