import { Component, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { BlogCard, BlogArticle } from '../blog-card/blog-card';

@Component({
  selector: 'app-all-articles',
  standalone: true,
  imports: [TranslocoPipe, BlogCard],
  templateUrl: './all-articles.html',
  styleUrls: ['./all-articles.scss'],
})
export class AllArticles {
  years = signal<number[]>([2025, 2024]);
  selectedYear = signal<number>(2025);

  articles = signal<BlogArticle[]>([
    {
      id: 1,
      title: 'Blog Title',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      image: '/images/blog/article-1.jpg',
      author: '',
      date: '12/11/2025',
    },
    {
      id: 2,
      title: 'Blog Title',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      image: '/images/blog/article-2.jpg',
      author: '',
      date: '13/11/2025',
    },
    {
      id: 3,
      title: 'Blog Title',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      image: '/images/blog/article-3.jpg',
      author: '',
      date: '12/11/2025',
    },
    {
      id: 4,
      title: 'Blog Title',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      image: '/images/blog/article-4.jpg',
      author: '',
      date: '12/11/2025',
    },
    {
      id: 5,
      title: 'Blog Title',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      image: '/images/blog/article-5.jpg',
      author: '',
      date: '13/11/2025',
    },
    {
      id: 6,
      title: 'Blog Title',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      image: '/images/blog/article-6.jpg',
      author: '',
      date: '12/11/2025',
    },
    {
      id: 7,
      title: 'Blog Title',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      image: '/images/blog/article-7.jpg',
      author: '',
      date: '12/11/2025',
    },
    {
      id: 8,
      title: 'Blog Title',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      image: '/images/blog/article-8.jpg',
      author: '',
      date: '13/11/2025',
    },
    {
      id: 9,
      title: 'Blog Title',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      image: '/images/blog/article-9.jpg',
      author: '',
      date: '12/11/2025',
    },
  ]);

  selectYear(year: number): void {
    this.selectedYear.set(year);
  }
}
