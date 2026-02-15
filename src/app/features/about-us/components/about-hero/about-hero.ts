import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-about-hero',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './about-hero.html',
  styleUrls: ['./about-hero.scss'],
})
export class AboutHero {}
