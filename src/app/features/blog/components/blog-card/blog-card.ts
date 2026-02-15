import { Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

export interface BlogArticle {
  id: number;
  title: string;
  description: string;
  image: string;
  author: string;
  date: string;
  isRecentlyUpdated?: boolean;
}

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './blog-card.html',
  styleUrls: ['./blog-card.scss'],
})
export class BlogCard {
  article = input.required<BlogArticle>();
  variant = input<'featured' | 'default'>('default');
}
