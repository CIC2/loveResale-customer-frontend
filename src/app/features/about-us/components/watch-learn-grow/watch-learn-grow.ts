import { Component, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

interface StatItem {
  value: string;
  labelKey: string;
  image: string;
}

@Component({
  selector: 'app-watch-learn-grow',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './watch-learn-grow.html',
  styleUrls: ['./watch-learn-grow.scss'],
})
export class WatchLearnGrow {
  stats = signal<StatItem[]>([
    {
      value: '+55',
      labelKey: 'about.statistics.items.yearsOfSuccess',
      image: '/images/about-card.jpg',
    },
    {
      value: '23',
      labelKey: 'about.statistics.items.developedLand',
      image: '/images/about-card.jpg',
    },
    {
      value: '+150K',
      labelKey: 'about.statistics.items.unitsDelivered',
      image: '/images/about-card.jpg',
    },
  ]);
}
