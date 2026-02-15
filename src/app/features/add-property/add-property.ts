import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';
import { PropertyDetailsForm } from './components/property-details-form/property-details-form';
import { PropertyPaymentForm } from './components/property-payment-form/property-payment-form';
import { PropertyMediaForm } from './components/property-media-form/property-media-form';
import { PropertyContactForm } from './components/property-contact-form/property-contact-form';
import { PropertyPreviewCard } from './components/property-preview-card/property-preview-card';
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from 'primeng/accordion';
import { SvgIconComponent } from 'angular-svg-icon';

export interface PropertyFormData {
  // Details
  project: string;
  type: string;
  floor: string;
  bathrooms: number;
  finishing: string;
  delivery: string;
  area: number;
  group: number;
  unitNumber: string;
  view: string;
  garage: string;
  bedrooms: number;
  // Payment
  unitPrice: number;
  paidAmount: number;
  overAmount: number;
  installmentPlan: string;
  // Contact
  name: string;
  email: string;
  phoneNumber: string;
  whatsapp: string;
  // Media
  images: string[];
}

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoPipe,
    PropertyDetailsForm,
    PropertyPaymentForm,
    PropertyMediaForm,
    PropertyContactForm,
    PropertyPreviewCard,
    Accordion,
    AccordionPanel,
    AccordionHeader,
    AccordionContent,
    SvgIconComponent,
  ],
  templateUrl: './add-property.html',
  styleUrl: './add-property.scss',
})
export class AddProperty {
  // Form data signal
  formData = signal<PropertyFormData>({
    project: '',
    type: '',
    floor: '',
    bathrooms: 0,
    finishing: '',
    delivery: '',
    area: 0,
    group: 0,
    unitNumber: '',
    view: '',
    garage: '',
    bedrooms: 0,
    unitPrice: 0,
    paidAmount: 0,
    overAmount: 0,
    installmentPlan: '',
    name: '',
    email: '',
    phoneNumber: '',
    whatsapp: '',
    images: [],
  });

  // Computed property for preview
  previewData = computed(() => {
    const data = this.formData();
    return {
      location: data.project ? 'New Heliopolis City' : '',
      title: data.project && data.type ? `${data.type} - New Cairo` : 'Standalone Villa - New Cairo',
      type: data.type || 'Apartment',
      floor: data.floor || '1st',
      bed: data.view || 'Garden View',
      bedrooms: data.bedrooms || 4,
      bathrooms: data.bathrooms || 4,
      finishing: data.finishing || 'Super',
      delivery: data.delivery || 'Delivered',
      area: data.area || 132,
      group: data.group || 24,
      unitNumber: data.unitNumber || '24',
      garage: data.garage || 'Included',
      unitPrice: data.unitPrice,
      paidAmount: data.paidAmount,
      overAmount: data.overAmount,
      installmentPlan: data.installmentPlan,
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      whatsapp: data.whatsapp,
      images: data.images,
    };
  });

  onDetailsChange(details: Partial<PropertyFormData>): void {
    this.formData.update((current) => ({ ...current, ...details }));
  }

  onPaymentChange(payment: Partial<PropertyFormData>): void {
    this.formData.update((current) => ({ ...current, ...payment }));
  }

  onMediaChange(media: { images: string[] }): void {
    this.formData.update((current) => ({ ...current, images: media.images }));
  }

  onContactChange(contact: Partial<PropertyFormData>): void {
    this.formData.update((current) => ({ ...current, ...contact }));
  }
}
