import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mib-slider-partners',
  styleUrls: ['./mib-slider-partners.component.scss'],
  templateUrl: './mib-slider-partners.component.html',
})
export class MibSliderPartnersComponent implements OnInit {
  @Input() partners: string[] = [];

  responsiveOptions;

  constructor() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit() {}
}
