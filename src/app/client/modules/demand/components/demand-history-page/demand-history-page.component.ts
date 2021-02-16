import { DemandInterface } from '../../types/demand.interface';
import { select, Store } from '@ngrx/store';
import { getDemandsAction } from '../../store/actions/getDemands.action';
import { of, Observable } from 'rxjs';
import { SortEvent } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { demandssSelector, errorSelector, isLoadingSelector } from '../../store/selectors';

@Component({
  selector: 'app-demand-history-page',
  templateUrl: './demand-history-page.component.html',
  styleUrls: ['./demand-history-page.component.scss'],
})
export class DemandPageComponent implements OnInit {
  demands$: Observable<DemandInterface[] | null>;
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
    this.demands$ = this.store.pipe(select(demandssSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
  }

  fetch(): void {
    this.store.dispatch(getDemandsAction());
  }

  add() {

  }

  ngOnDestroy() {
  }
}
