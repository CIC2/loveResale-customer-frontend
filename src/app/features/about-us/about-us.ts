import { Component } from '@angular/core';
import {
  AboutHero,
  AboutTmg,
  WatchLearnGrow,
  TrustPartner,
  MissionVision,
  FamilyCta,
} from './components';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    AboutHero,
    AboutTmg,
    WatchLearnGrow,
    TrustPartner,
    MissionVision,
    FamilyCta,
  ],
  template: `
    <app-about-hero />
    <app-about-tmg />
    <app-watch-learn-grow />
    <app-trust-partner />
    <app-mission-vision />
    <app-family-cta />
  `,
  styles: [],
})
export class AboutUs {}
