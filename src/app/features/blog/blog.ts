import { Component } from '@angular/core';
import {
  BlogHero,
  FeaturedBlogs,
  AllArticles,
} from './components';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    BlogHero,
    FeaturedBlogs,
    AllArticles,
  ],
  template: `
    <app-blog-hero />
    <app-featured-blogs />
    <app-all-articles />
  `,
  styles: [],
})
export class Blog {}
