import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'mib-tab-item',
  templateUrl: './tab-item.component.html',
  styleUrls: ['./tab-item.component.scss']
})
export class TabItemComponent {

  @Input() value: string = ''

  @HostBinding('class.hidden') get isHidden(): boolean {
    return !this.selected;
  }

  public selected: boolean = false;

  constructor() {
  }

  setSelected(value: boolean) {
    this.selected = value
  }
}
