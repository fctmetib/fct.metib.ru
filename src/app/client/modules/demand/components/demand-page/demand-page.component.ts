import { DemandInterface } from './../../types/demand.interface';
import { select, Store } from '@ngrx/store';
import { getDemandsAction } from './../../store/actions/getDemands.action';
import { of, Observable } from 'rxjs';
import { SortEvent } from 'primeng/api';
import { DemandService } from './../../services/demand.service';
import { Component, OnInit } from '@angular/core';
import { demandssSelector, errorSelector, isLoadingSelector } from '../../store/selectors';

@Component({
  selector: 'app-demand-page',
  templateUrl: './demand-page.component.html',
  styleUrls: ['./demand-page.component.scss'],
})
export class DemandPageComponent implements OnInit {
  requests$: Observable<DemandInterface[] | null>;
  error$: Observable<string | null>;
  isLoading$: Observable<boolean>;

  displayModal: boolean;
  loading: boolean = true;

  selectedItems: DemandInterface[];

  constructor(private store: Store) {}

  ngOnInit() {
    this.initializeValues();
    this.fetch();
  }

  initializeValues(): void {
    this.requests$ = this.store.pipe(select(demandssSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
  }

  fetch(): void {
    this.store.dispatch(getDemandsAction());
  }

  customSort(event: SortEvent) {
    let requests: any[] = [];
    console.log(event);


    requests = [...event.data].sort((data1, data2) => {
      // console.log(data1['Number'])
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null) {
        result = -1;
      } else if (value1 != null && value2 == null) {
        result = 1;
      } else if (value1 == null && value2 == null) {
        result = 0;
      } else if (typeof value1 === 'string' && typeof value2 === 'string') {
        result = value1.localeCompare(value2);
      } else {
        result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
      }

      return event.order * result;
    });

    this.requests$ = of(requests);
  }

  onRowSelect(event) {
    console.log('ROW SELECTED', event.data);
  }

  onRowUnselect(event) {
    console.log('ROW UNSELECTED', event.data);
  }

  add() {

  }

  ngOnDestroy() {
  }
}
