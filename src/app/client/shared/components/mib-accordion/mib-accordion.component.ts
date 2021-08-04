import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { MIBAccordionGroupComponent } from './mib-accordion-group.component';

@Component({
  selector: 'mib-accordion',
  template: `
  <div class="notification-list">
    <ng-content></ng-content>
  </div>
`,
  styleUrls: ['./mib-accordion.component.scss']
})
export class MIBAccordionComponent  implements AfterContentInit {
  @ContentChildren(MIBAccordionGroupComponent)
  groups: QueryList<MIBAccordionGroupComponent>;

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
