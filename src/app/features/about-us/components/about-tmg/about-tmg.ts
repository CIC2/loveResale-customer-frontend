import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-about-tmg',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './about-tmg.html',
  styleUrls: ['./about-tmg.scss'],
})
export class AboutTmg {}
