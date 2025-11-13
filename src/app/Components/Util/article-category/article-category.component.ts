import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArticleService } from 'src/app/articles/services/article.service';

@Component({
  selector: 'app-article-category',
  templateUrl: './article-category.component.html',
  styleUrls: ['./article-category.component.css'],
})
export class ArticleCategoryComponent implements OnInit {
  @Input() selectedValue: string = '';
  @Output() valueChange = new EventEmitter<string>();

  estados: { guid: string; description: string }[] = [];

  constructor(private stateService: ArticleService) {}

  ngOnInit() {
    this.stateService.GetCategoryArticle().subscribe(
      (response) => {
        if (response.success) {
          this.estados = response.content;
        }
      },
      (error) => {}
    );
  }

  onValueChange(value: string): void {
    this.valueChange.emit(value);
  }
}
