import { Component, output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-property-contact-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoPipe,
    InputTextModule,
  ],
  templateUrl: './property-contact-form.html',
  styleUrl: './property-contact-form.scss',
})
export class PropertyContactForm implements OnInit {
  private fb = inject(FormBuilder);

  contactChange = output<Record<string, unknown>>();

  form!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      phoneNumber: [''],
      whatsapp: [''],
    });

    // Emit initial values
    this.contactChange.emit(this.form.value);

    // Subscribe to form changes
    this.form.valueChanges.subscribe((value) => {
      this.contactChange.emit(value);
    });
  }
}
