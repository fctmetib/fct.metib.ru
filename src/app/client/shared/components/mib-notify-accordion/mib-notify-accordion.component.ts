import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { MIBNotifyAccordionGroupComponent } from './mib-notify-accordion-group.component';
@Component({
  selector: 'mib-notify-accordion',
  template: `
    <div class="notification-list">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./mib-notify-accordion.component.scss'],
})
export class MIBNotifyAccordionComponent implements AfterContentInit {
  @Output()
  readNotification: EventEmitter<any> = new EventEmitter();

  @ContentChildren(MIBNotifyAccordionGroupComponent)
  groups: QueryList<MIBNotifyAccordionGroupComponent>;

  /**
   * Вызывается, когда все дочерние элементы (группы) готовы
   */
  ngAfterContentInit() {
    // Повторяет, для всех групп
    this.groups.toArray().forEach((t) => {
      // момент, когда нажали по Title
      // (toggle это @output событие Группы)
      t.toggle.subscribe(() => {
        // Открывает группу
        this.openGroup(t);
        let readNotifyData = {
          id: t.id,
          isOpen: t.opened
        }
        this.readNotification.emit(readNotifyData);
      });
    });
  }

  /**
   * Открывает текущую группу
   * @param group Экземпляр группы
   */
  openGroup(group: any) {
    // открывает текущую группу
    group.opened = !group.opened;
  }
}
