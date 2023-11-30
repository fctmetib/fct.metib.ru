import {Component, Input} from '@angular/core';

@Component({
  selector: 'mib-tab-item',
  templateUrl: './tab-item.component.html',
  styleUrls: ['./tab-item.component.scss']
})
export class TabItemComponent {

  @Input() value: string = ''

  constructor() {
  }

  public selected: boolean = false;

  setSelected(value: boolean) {
    this.selected = value
  }
}
