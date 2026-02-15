import { Component, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';

interface MvvCard {
  titleKey: string;
  descriptionKey: string;
}

@Component({
  selector: 'app-mission-vision',
  standalone: true,
  imports: [TranslocoPipe, ButtonModule],
  templateUrl: './mission-vision.html',
  styleUrls: ['./mission-vision.scss'],
})
export class MissionVision {
  cards = signal<MvvCard[]>([
    {
      titleKey: 'about.mvv.mission.title',
      descriptionKey: 'about.mvv.mission.description',
    },
    {
      titleKey: 'about.mvv.vision.title',
      descriptionKey: 'about.mvv.vision.description',
    },
    {
      titleKey: 'about.mvv.values.title',
      descriptionKey: 'about.mvv.values.description',
    },
  ]);
}
