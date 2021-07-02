import { Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mib-button',
  styleUrls: ['./mib-button.component.scss'],
  template: `
    <button class="mib-button" type="button" [ngClass]="theme" [style.width]="width ? width+'%' : ''" [disabled]="disable">
      <img [src]="icon" alt="" *ngIf="icon"  [ngClass]="{'mr-5':title}" />
      <span *ngIf="title">{{ title }}</span>
    </button>
  `,
})
export class MibButtonComponent implements OnInit {
  @Output() click = new EventEmitter();

  @Input() title: string;

  @Input() icon: string;

  @Input() width: number;

  // regular, default, icon
  @Input() theme: string = 'default';

  @Input() disable: boolean;

  onClick() {
    this.click.emit();
  }

  constructor() {}

  ngOnInit() {}
}
