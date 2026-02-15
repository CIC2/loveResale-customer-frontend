import { Component, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

interface PartnerCard {
  titleKey: string;
  descriptionKey: string;
  icon: string;
}

@Component({
  selector: 'app-trust-partner',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './trust-partner.html',
  styleUrls: ['./trust-partner.scss'],
})
export class TrustPartner {
  cards = signal<PartnerCard[]>([
    {
      titleKey: 'about.trustPartner.items.portfolio.title',
      descriptionKey: 'about.trustPartner.items.portfolio.description',
      icon: 'pi-building',
    },
    {
      titleKey: 'about.trustPartner.items.portfolio.title',
      descriptionKey: 'about.trustPartner.items.portfolio.description',
      icon: 'pi-building',
    },
    {
      titleKey: 'about.trustPartner.items.portfolio.title',
      descriptionKey: 'about.trustPartner.items.portfolio.description',
      icon: 'pi-building',
    },
    {
      titleKey: 'about.trustPartner.items.portfolio.title',
      descriptionKey: 'about.trustPartner.items.portfolio.description',
      icon: 'pi-building',
    },
  ]);
}
