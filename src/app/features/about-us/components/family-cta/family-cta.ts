import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-family-cta',
  standalone: true,
  imports: [TranslocoPipe, ButtonModule],
  templateUrl: './family-cta.html',
  styleUrls: ['./family-cta.scss'],
})
export class FamilyCta {}
