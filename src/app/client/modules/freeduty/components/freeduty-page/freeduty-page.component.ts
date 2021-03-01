import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DutyService } from 'src/app/shared/services/share/duty.service';
import { DatePipe } from '@angular/common';
import { DutyFilterRequestInterface } from 'src/app/shared/types/duty/duty-filter-request.interface';
import { getFreedutyAction } from '../../store/actions/getFreeduty.action';
import {
  errorSelector,
  freedutySelector,
  isLoadingSelector,
} from '../../store/selectors';
import { DutyInterface } from 'src/app/shared/types/duty/duty.interface';

@Component({
  selector: 'app-freeduty-page',
  templateUrl: './freeduty-page.component.html',
  styleUrls: ['./freeduty-page.component.scss'],
  providers: [DatePipe],
})
export class FreedutyPageComponent implements OnInit {
  freeduty$: Observable<DutyInterface[] | null>;
  error$: Observable<string | null>;
  isLoading$: Observable<boolean>;

  selectedItems: DutyInterface[];
  filterForm: FormGroup;
  filterDialog: boolean = false;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    public dialogService: DialogService,
    public datepipe: DatePipe
  ) {}

  ngOnInit() {
    this.initializeValues();
    this.fetch();
  }

  initializeValues(): void {
    this.freeduty$ = this.store.pipe(select(freedutySelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));

    this.filterForm = this.fb.group({
      dateFrom: [new Date(), [Validators.required]],
      dateTo: [new Date(), [Validators.required]],
    });
  }

  openDateModal() {
    this.filterDialog = true;
  }

  closeDateModal() {
    this.filterDialog = false;
  }

  saveFilter() {
    this.closeDateModal();
  }

  applyFilters(): void {
    this.fetch();
  }

  fetch(): void {
    if(this.filterForm.value.dateFrom && this.filterForm.value.dateTo) {
      let data: DutyFilterRequestInterface = {
        CustomerID: 1050,
        DateFrom: new Date(this.filterForm.value.dateFrom),
        DateTo:  new Date(this.filterForm.value.dateTo),
        Free: false,
      };

      this.store.dispatch(getFreedutyAction({ data }));
    }
  }
}
