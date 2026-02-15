import { Component, output, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-property-details-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoPipe,
    SelectModule,
    InputTextModule,
    InputNumberModule,
  ],
  templateUrl: './property-details-form.html',
  styleUrl: './property-details-form.scss',
})
export class PropertyDetailsForm implements OnInit {
  private fb = inject(FormBuilder);
  
  detailsChange = output<Record<string, unknown>>();

  form!: FormGroup;

  // Dropdown options
  projectOptions = signal([
    { label: 'New Kairo', value: 'new-kairo' },
    { label: 'Madinaty', value: 'madinaty' },
    { label: 'Rehab City', value: 'rehab-city' },
    { label: 'Sodic East', value: 'sodic-east' },
  ]);

  typeOptions = signal([
    { label: 'Apartment', value: 'apartment' },
    { label: 'Villa', value: 'villa' },
    { label: 'Twin House', value: 'twin-house' },
    { label: 'Townhouse', value: 'townhouse' },
    { label: 'Penthouse', value: 'penthouse' },
  ]);

  floorOptions = signal([
    { label: 'Ground', value: 'ground' },
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
    { label: 'Three', value: '3' },
    { label: 'Four', value: '4' },
    { label: 'Five', value: '5' },
  ]);

  bathroomsOptions = signal([
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
  ]);

  finishingOptions = signal([
    { label: 'Super', value: 'super' },
    { label: 'Semi-Finished', value: 'semi-finished' },
    { label: 'Core & Shell', value: 'core-shell' },
    { label: 'Fully Finished', value: 'fully-finished' },
  ]);

  deliveryOptions = signal([
    { label: 'Delivered', value: 'delivered' },
    { label: '2024', value: '2024' },
    { label: '2025', value: '2025' },
    { label: '2026', value: '2026' },
    { label: '2027', value: '2027' },
  ]);

  viewOptions = signal([
    { label: 'Garden, Neighbour', value: 'garden-neighbour' },
    { label: 'Pool View', value: 'pool-view' },
    { label: 'Street View', value: 'street-view' },
    { label: 'Lake View', value: 'lake-view' },
  ]);

  bedroomsOptions = signal([
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6+', value: 6 },
  ]);

  garageOptions = signal([
    { label: 'Included', value: 'included' },
    { label: 'Not Included', value: 'not-included' },
  ]);

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      project: ['new-kairo'],
      type: ['apartment'],
      floor: ['1'],
      bathrooms: [2],
      finishing: [null],
      delivery: ['delivered'],
      area: [132],
      group: [24],
      unitNumber: ['106'],
      view: ['garden-neighbour'],
      bedrooms: [3],
      garage: ['included'],
    });

    // Emit initial values
    this.detailsChange.emit(this.form.value);

    // Subscribe to form changes
    this.form.valueChanges.subscribe((value) => {
      this.detailsChange.emit(value);
    });
  }
}
