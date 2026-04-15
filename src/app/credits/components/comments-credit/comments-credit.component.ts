import { Component, Input, OnInit } from '@angular/core';
import { CommentDto } from '../../models/credit-detail-dto-model';

@Component({
  selector: 'app-comments-credit',
  templateUrl: './comments-credit.component.html',
  styleUrls: ['./comments-credit.component.css'],
})
export class CommentsCreditComponent {
  commentsLst: CommentDto[] = [];
  @Input() set comments(comment: CommentDto[] | null) {
    if (comment && comment.length) {
      this.commentsLst = [...comment].sort(
        (a, b) =>
          new Date(b.dateCreate).getTime() - new Date(a.dateCreate).getTime()
      );
    } else {
      this.commentsLst = [];
    }
  }
}
