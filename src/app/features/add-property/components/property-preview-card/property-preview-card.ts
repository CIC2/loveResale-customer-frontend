import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';
import { SvgIconComponent } from 'angular-svg-icon';

export interface PreviewData {
  location: string;
  title: string;
  type: string;
  floor: string;
  bed: string;
  bedrooms: number;
  bathrooms: number;
  finishing: string;
  delivery: string;
  area: number;
  group: number;
  unitNumber: string;
  garage: string;
  unitPrice: number;
  paidAmount: number;
  overAmount: number;
  installmentPlan: string;
  name: string;
  email: string;
  phoneNumber: string;
  whatsapp: string;
  images: string[];
}

@Component({
  selector: 'app-property-preview-card',
  standalone: true,
  imports: [CommonModule, TranslocoPipe, SvgIconComponent],
  templateUrl: './property-preview-card.html',
  styleUrl: './property-preview-card.scss',
})
export class PropertyPreviewCard {
  previewData = input.required<PreviewData>();
}
