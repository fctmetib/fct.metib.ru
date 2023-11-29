import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject } from 'rxjs';
import { RequestEventsInterface } from '../../../types/request-events.interface';

@Component({
    selector: 'events-view',
    templateUrl: 'events-view.component.html',
    styleUrls: ['./events-view.component.scss'],
})
export class EventsViewComponent implements OnInit {

    public events$ = new BehaviorSubject<RequestEventsInterface[]>([]);

    constructor(
      public ref: DynamicDialogRef,
      public config: DynamicDialogConfig
    ) {}
  
    ngOnInit() {
      if (this.config?.data) {
        this.events$.next(this.config.data);
      }
    }
}