import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-blog-hero',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './blog-hero.html',
  styleUrls: ['./blog-hero.scss'],
})
export class BlogHero {}
