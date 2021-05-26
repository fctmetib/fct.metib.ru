import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-factoring-info',
  templateUrl: './factoring-info.component.html',
  styleUrls: ['./factoring-info.component.scss'],
})
export class FactoringInfoComponent implements OnInit, OnDestroy {
  @Input()
  currentDemandInfo: any;

  @Output()
  sendMessage: EventEmitter<any> = new EventEmitter<any>();

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Заявка',
      },
      {
        label: 'Лимит',
      },
      {
        label: 'Досье',
      },
      {
        label: 'Факторинг',
      },
    ];
  }

  ngOnDestroy(): void {}
}
