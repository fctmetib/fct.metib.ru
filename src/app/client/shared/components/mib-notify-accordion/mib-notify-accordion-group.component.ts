import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mib-notify-accordion-group',
  template: `
  <div class="mib-panel">
    <div class="mib-panel-header" (click)="toggle.emit()" [ngClass]="{'mib-panel-header__active': opened}">
      <div class="mib-panel-header__content" >
        <div class="mib-panel-header__content__title">
          {{title}}
        </div>
        <div class="mib-panel-header__content__date">
          {{date | date:"dd.MM.yyyy"}}
        </div>
      </div>
      <div class="mib-panel-header__action">
        <button class="mib-panel-header__action__button" [ngClass]="{'active' : opened}">
          {{!opened ? 'Посмотреть' : 'Скрыть'}}
        </button>
      </div>
    </div>

    <div class="body" [ngClass]="{'hidden': !opened}">
      <ng-content></ng-content>
    </div>
  <div>
  `,
  styleUrls: ['./mib-notify-accordion.component.scss'],
})
export class MIBNotifyAccordionGroupComponent {

  /**
   * Панель открыта или закрыта
   */
  @Input() opened = false;

  /**
   * Текст, который отображается на панеле
   */
  @Input() title: string;

  /**
   * Дата, которая отображается на панеле
   */
   @Input() date: string;

  /**
   * ID новости
   */
   @Input() id: string;

  /**
   * Вызывается, когда пользоваель нажимает на поле Title
   * @type {EventEmitter<any>}
   */
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();
}
