import { Component, inject, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { TranslocoService } from '@jsverse/transloco';
import {
  HeroSection,
  PropertyCategories,
  FeaturedProperties,
  ProcessSteps,
  PromotionalBanner,
  ProjectsListing,
} from './components';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSection,
    FeaturedProperties,
    ProcessSteps,
    PromotionalBanner,
    ProjectsListing,
  ],
  template: `
    <app-hero-section />
    <app-process-steps />
    <app-featured-properties />
    <app-promotional-banner />
    <app-projects-listing />
  `,
  styles: [],
})
export class Home implements OnInit {
  private readonly meta = inject(Meta);
  private readonly translocoService = inject(TranslocoService);

  ngOnInit(): void {
    const description = this.translocoService.translate('home.metaDescription');
    this.meta.updateTag({ name: 'description', content: description });
  }
}
