import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { SvgIconComponent } from 'angular-svg-icon';

interface BranchInfo {
  titleKey: string;
  addressKey: string;
  type: 'hotline' | 'branch';
  icon: string;
}

@Component({
  selector: 'app-get-in-touch',
  standalone: true,
  imports: [TranslocoPipe, SvgIconComponent],
  templateUrl: './get-in-touch.html',
  styleUrls: ['./get-in-touch.scss'],
})
export class GetInTouch {
  branches: BranchInfo[] = [
    {
      titleKey: 'contactUs.getInTouch.hotline.title',
      addressKey: 'contactUs.getInTouch.hotline.number',
      type: 'hotline',
      icon: 'contact/phone',
    },
    {
      titleKey: 'contactUs.getInTouch.mainSalesCenter.title',
      addressKey: 'contactUs.getInTouch.mainSalesCenter.address',
      type: 'branch',
      icon: 'contact/location',
    },
    {
      titleKey: 'contactUs.getInTouch.tmgHeadquarter.title',
      addressKey: 'contactUs.getInTouch.tmgHeadquarter.address',
      type: 'branch',
      icon: 'contact/location',
    },
    {
      titleKey: 'contactUs.getInTouch.faisaliahCenter.title',
      addressKey: 'contactUs.getInTouch.faisaliahCenter.address',
      type: 'branch',
      icon: 'contact/location',
    },
    {
      titleKey: 'contactUs.getInTouch.jeddahCenter.title',
      addressKey: 'contactUs.getInTouch.jeddahCenter.address',
      type: 'branch',
      icon: 'contact/location',
    },
  ];
}
