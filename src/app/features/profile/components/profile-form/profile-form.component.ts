import {
  ChangeDetectionStrategy,
  Component,
  input,
  Input,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';

import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';

type OptionItem = {
  label: string;
  value: string;
};

export type ProfileFormPatchData = Partial<{
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string;
  phoneNumberOptional: string;
  email: string;
  birthDate: Date | null;
  nationality: string;
  gender: string;
}>;

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [
    BreadcrumbModule,
    ButtonModule,

    Select,
    InputTextModule,
    ReactiveFormsModule,
    TranslocoPipe,
  ],
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFormComponent {
  private _formGroup!: FormGroup;
  private _initialData: ProfileFormPatchData | null = null;

  @Input({ required: true })
  set formGroup(fg: FormGroup) {
    this._formGroup = fg;
    this.applyInitialData();
  }
  get formGroup(): FormGroup {
    return this._formGroup;
  }

  @Input() set initialData(value: ProfileFormPatchData | null) {
    this._initialData = value;
    this.applyInitialData();
  }

  breadcrumbItems = input.required<MenuItem[]>();
  genderOptions = input.required<OptionItem[]>();
  nationalityOptions = input.required<OptionItem[]>();

  private applyInitialData(): void {
    if (this._formGroup && this._initialData) {
      this._formGroup.patchValue(this._initialData);
    }
  }
}
