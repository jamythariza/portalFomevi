import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArticleService } from 'src/app/articles/services/article.service';
import { login } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-article-category',
  templateUrl: './article-category.component.html',
  styleUrls: ['./article-category.component.css'],
})
export class ArticleCategoryComponent implements OnInit {
  @Input() selectedValue: string = '';
  @Output() valueChange = new EventEmitter<string>();

  estados: { guid: string; description: string }[] = [];

  constructor(
    private stateService: ArticleService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    var credentials: login = {
      user: environment.user,
      password: environment.password,
      email: '',
    };

    this.auth.login(credentials).subscribe({
      next: () => {
        this.stateService.GetCategoryArticle().subscribe(
          (response) => {
            if (response.success) {
              this.estados = response.content;
            }
          },
          (error) => {}
        );
      },
      error: (err) => console.error('Error en login:', err),
    });
  }

  onValueChange(value: string): void {
    this.valueChange.emit(value);
  }
}
