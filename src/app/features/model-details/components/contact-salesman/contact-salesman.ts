import { Component, output } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-contact-salesman',
  standalone: true,
  imports: [TranslocoPipe, ButtonModule],
  templateUrl: './contact-salesman.html',
  styleUrl: './contact-salesman.scss',
})
export class ContactSalesman {
  contactClick = output<void>();
  bookClick = output<void>();

  onZoomMeeting(): void {
    this.contactClick.emit();
  }

  onBookAppointment(): void {
    this.bookClick.emit();
  }

  onSubmitContactRequest(): void {
    console.log('Submit contact request');
  }
}
