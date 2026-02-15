import { Component } from '@angular/core';
import {
  ContactHero,
  GetInTouch,
  RegisterInterest,
  ContactMap,
} from './components';
import { FamilyCta } from '../about-us/components/family-cta/family-cta';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    ContactHero,
    GetInTouch,
    RegisterInterest,
    ContactMap,
    FamilyCta,
  ],
  templateUrl: './contact-us.html',
  styleUrls: ['./contact-us.scss'],
})
export class ContactUs {}
