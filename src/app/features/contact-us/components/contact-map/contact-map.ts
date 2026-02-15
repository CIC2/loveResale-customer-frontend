import { Component, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';

type ViewMode = 'map' | 'video' | 'amenities';

interface MapZone {
  id: string;
  labelKey: string;
}

@Component({
  selector: 'app-contact-map',
  standalone: true,
  imports: [TranslocoPipe, ButtonModule],
  templateUrl: './contact-map.html',
  styleUrls: ['./contact-map.scss'],
})
export class ContactMap {
  currentView = signal<ViewMode>('map');

  mapZones: MapZone[] = [
    { id: 'zone-v11', labelKey: 'Zone V11' },
    { id: 'zone-v13', labelKey: 'Zone V13' },
    { id: 'zone-v15', labelKey: 'Zone V15' },
    { id: 'zone-v10', labelKey: 'Zone V10' },
    { id: 'zone-v14', labelKey: 'Zone V14' },
    { id: 'zone-v17', labelKey: 'Zone V17' },
    { id: 'zone-v19', labelKey: 'Zone V19' },
    { id: 'zone-v16', labelKey: 'Zone V16' },
  ];

  setView(view: ViewMode): void {
    this.currentView.set(view);
  }
}
