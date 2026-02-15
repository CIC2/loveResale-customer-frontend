import { Component, signal } from '@angular/core';
import { BlogCard, BlogArticle } from '../blog-card/blog-card';

@Component({
  selector: 'app-featured-blogs',
  standalone: true,
  imports: [BlogCard],
  templateUrl: './featured-blogs.html',
  styleUrls: ['./featured-blogs.scss'],
})
export class FeaturedBlogs {
  featuredArticles = signal<BlogArticle[]>([
    {
      id: 1,
      title: 'Blog Title',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
      image: '/images/blog/featured-1.jpg',
      author: 'Nouran Khaled',
      date: '27 Aug, 2025',
      isRecentlyUpdated: true,
    },
    {
      id: 2,
      title: 'Blog Title',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
      image: '/images/blog/featured-2.jpg',
      author: 'Nouran Khaled',
      date: '27 Aug, 2025',
      isRecentlyUpdated: true,
    },
  ]);
}
