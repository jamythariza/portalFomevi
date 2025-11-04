import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ArticleImageDto } from '../../model/article-request-dto';

@Component({
  selector: 'app-article-image',
  templateUrl: './article-image.component.html',
  styleUrls: ['./article-image.component.css'],
})
export class ArticleImageComponent {
  @Input() images: ArticleImageDto[] = [];
  @Input() guid!: string;
  private lastCount = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images']) {
      const currentImages = changes['images'].currentValue as ArticleImageDto[];
      if (currentImages && currentImages.length !== this.lastCount) {
        this.lastCount = currentImages.length;
        console.log('📸 Nuevas imágenes detectadas:', currentImages);
      }
    }
  }

  getImageSrc(img: any): string {
    const base64 = img?.imageBase64 ?? '';

    if (base64.startsWith('data:image')) {
      return base64;
    }
    return `data:image/jpeg;base64,${base64}`;
  }
}
