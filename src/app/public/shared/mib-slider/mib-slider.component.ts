import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mib-slider',
  styleUrls: ['./mib-slider.component.scss'],
  template: `
    <div class="mib-slider">
<!--      <mib-button-->
<!--        *ngIf="list.isOverflow"-->
<!--        [disable]="!list.canScrollStart"-->
<!--        (click)="list.scroll(-1)"-->
<!--        [icon]="'../../../../assets/icons/button-icons/arrow-right.svg'"-->
<!--        [theme]="'scroller'"-->
<!--        id="scroll-left"-->
<!--      ></mib-button>-->
      <div class="list" mib-scroll #list="mib-scroll" [scrollUnit]="240" [ngClass]="theme">
        <ng-content></ng-content>
      </div>
<!--      <mib-button-->
<!--        *ngIf="list.isOverflow"-->
<!--        [disable]="!list.canScrollEnd"-->
<!--        (click)="list.scroll(1)"-->
<!--        [icon]="'../../../../assets/icons/button-icons/arrow-left.svg'"-->
<!--        [theme]="'scroller'"-->
<!--        id="scroll-right"-->
<!--      ></mib-button>-->
    </div>
  `,
})
export class MibSliderComponent implements OnInit {

  // default, news
  @Input() theme: string = 'default';

  constructor() {}

  ngOnInit() {}
}
