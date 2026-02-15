import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

interface SelectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-register-interest',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslocoPipe,
    ButtonModule,
    InputTextModule,
    SelectModule,
    TextareaModule,
  ],
  templateUrl: './register-interest.html',
  styleUrls: ['./register-interest.scss'],
})
export class RegisterInterest {
  private fb = inject(FormBuilder);

  interestForm: FormGroup = this.fb.group({
    fullName: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    location: ['', [Validators.required]],
    project: ['', [Validators.required]],
    branch: ['', [Validators.required]],
    message: [''],
  });

  isSubmitting = false;

  locations: SelectOption[] = [
    { label: 'New Cairo', value: 'new-cairo' },
    { label: 'Mostakbal City', value: 'mostakbal-city' },
    { label: 'Sheikh Zayed', value: 'sheikh-zayed' },
    { label: 'North Coast', value: 'north-coast' },
    { label: 'Sharm El Sheikh', value: 'sharm' },
  ];

  projects: SelectOption[] = [
    { label: 'SouthMED', value: 'southmed' },
    { label: 'Madinaty', value: 'madinaty' },
    { label: 'Noor Smart City', value: 'noor' },
    { label: 'Capital Gardens', value: 'capital-gardens' },
  ];

  branches: SelectOption[] = [
    { label: 'Cairo', value: 'cairo' },
    { label: 'Alexandria', value: 'alexandria' },
    { label: 'North Coast', value: 'north-coast' },
    { label: 'New Administrative Capital', value: 'new-capital' },
  ];

  onSubmit(): void {
    if (this.interestForm.valid) {
      this.isSubmitting = true;
      console.log('Form submitted:', this.interestForm.value);

      setTimeout(() => {
        this.isSubmitting = false;
        this.interestForm.reset();
      }, 2000);
    } else {
      Object.keys(this.interestForm.controls).forEach((key) => {
        this.interestForm.get(key)?.markAsTouched();
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.interestForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}
