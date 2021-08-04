import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mib-group',
  template: `
  <div class="mib-panel">
    <div class="mib-panel-header" (click)="toggle.emit()">
      <div class="mib-panel-header__content" >
        <div class="mib-panel-header__content__title">
          {{title}}
        </div>
        <div class="mib-panel-header__content__date">
          {{date | date:"dd.MM.yyyy"}}
        </div>
      </div>
      <div class="mib-panel-header__action">
        {{!opened ? 'Посмотреть' : 'Скрыть'}}
      </div>
    </div>

    <div class="body" [ngClass]="{'hidden': !opened}">
      <ng-content></ng-content>
    </div>
  <div>
  `,
  styleUrls: ['./mib-accordion.component.scss'],
})
export class MIBAccordionGroupComponent {

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
   * Вызывается, когда пользоваель нажимает на поле Title
   * @type {EventEmitter<any>}
   */
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();
}
