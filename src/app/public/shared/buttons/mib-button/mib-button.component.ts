import { Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mib-button',
  styleUrls: ['./mib-button.component.scss'],
  template: `
    <ng-container>
      <button class="mib-button" type="button" [ngClass]="theme">
        <img [src]="icon" alt="" *ngIf="icon" />
        <span *ngIf="title">{{ title }}</span>
      </button>
    </ng-container>
  `,
})
export class MibButtonComponent implements OnInit {
  @Output() click = new EventEmitter();

  @Input() title: string;

  @Input() icon: string;

  // regular, default, icon
  @Input() theme: string = 'default';

  onClick() {
    this.click.emit();
  }

  constructor() {}

  ngOnInit() {}
}
