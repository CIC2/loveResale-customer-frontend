import { Component, output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-property-payment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoPipe,
    InputTextModule,
    InputNumberModule,
    SelectModule,
  ],
  templateUrl: './property-payment-form.html',
  styleUrl: './property-payment-form.scss',
})
export class PropertyPaymentForm implements OnInit {
  private fb = inject(FormBuilder);

  paymentChange = output<Record<string, unknown>>();

  form!: FormGroup;

  installmentOptions = [
    { label: '5 Years', value: '5-years' },
    { label: '7 Years', value: '7-years' },
    { label: '10 Years', value: '10-years' },
    { label: '15 Years', value: '15-years' },
  ];

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      unitPrice: [null],
      paidAmount: [null],
      overAmount: [null],
      installmentPlan: [null],
    });

    // Emit initial values
    this.paymentChange.emit(this.form.value);

    // Subscribe to form changes
    this.form.valueChanges.subscribe((value) => {
      this.paymentChange.emit(value);
    });
  }
}
