import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-contact-hero',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './contact-hero.html',
  styleUrls: ['./contact-hero.scss'],
})
export class ContactHero {}
