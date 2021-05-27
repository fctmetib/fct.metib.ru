import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabView } from 'primeng/tabview';
import { FactoringInfoInterface } from 'src/app/shared/modules/demand/types/common/factoring/factoring-info.interface';

@Component({
  selector: 'app-factoring-info',
  templateUrl: './factoring-info.component.html',
  styleUrls: ['./factoring-info.component.scss'],
})
export class FactoringInfoComponent implements OnInit, OnDestroy {
  @Input()
  currentDemandInfo: FactoringInfoInterface;

  @Output()
  sendMessage: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(TabView) tabView: TabView;

  items: MenuItem[] = [];

  ngOnInit() {

    this.currentDemandInfo.Steps.forEach(s => {
      this.items.push({
        label: s.Title,
        disabled: s.IsCompleted,
        styleClass: 'p-highlight active'
      })
      if(!s.IsCompleted) {
        this.tabView.tabs[s.Position--].selected = true;
      }
    })
  }

  ngOnDestroy(): void {}

  public getType(type: string): string {
    let result: string = '';
    switch(type) {
      case 'Factoring':
        result = 'Запрос на факторинг'
        break;
    }
    return result;
  }

  public getStatus(status: string): string {
    let result: string = '';
    switch(status) {
      case 'Created':
        result = 'Создан'
        break;
    }
    return result;
  }
}
