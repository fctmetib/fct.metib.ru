import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DatePipe } from '@angular/common';
import { DutyFilterRequestInterface } from 'src/app/shared/types/duty/duty-filter-request.interface';
import { getFreedutyAction } from '../../store/actions/getFreeduty.action';
import {
  errorSelector,
  freedutySelector,
  isLoadingSelector,
} from '../../store/selectors';
import { DutyInterface } from 'src/app/shared/types/duty/duty.interface';
import { factoringSelector } from 'src/app/client/store/selectors';

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

  selectedItems: DutyInterface[] = [];
  selectedItemsSorted: any[] = [];

  filterForm: FormGroup;

  filterDialog: boolean = false;
  requestsDialog: boolean = false;

  organizationId: number;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    public dialogService: DialogService,
    public datepipe: DatePipe
  ) {}

  ngOnInit() {
    this.initializeValues();
    this.initializeForm();
    this.fetch(false);
  }

  initializeValues(): void {
    this.freeduty$ = this.store.pipe(select(freedutySelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));

    this.store.pipe(select(factoringSelector)).subscribe((factoring) => {
      console.log(factoring);
      if (factoring) {
        this.organizationId = factoring.ID;
      }
    });
  }

  initializeForm() {
    let from = new Date();
    let to = new Date();
    from.setMonth(from.getMonth() - 1);

    this.filterForm = this.fb.group({
      dateFrom: [
        this.datepipe.transform(from, 'yyyy-MM-dd'),
        [Validators.required],
      ],
      dateTo: [
        this.datepipe.transform(to, 'yyyy-MM-dd'),
        [Validators.required],
      ],
    });
  }


  applyFilters(): void {
    this.fetch(true);
  }

  showAll(): void {
    this.fetch(false)
  }

  fetch(isFree: boolean): void {
    if (this.filterForm.value.dateFrom && this.filterForm.value.dateTo) {
      if (this.organizationId) {
        let data: DutyFilterRequestInterface = {
          CustomerID: this.organizationId,
          DateFrom: new Date(this.filterForm.value.dateFrom),
          DateTo: new Date(this.filterForm.value.dateTo),
          Free: isFree,
        };

        this.store.dispatch(getFreedutyAction({ data }));
      }
    }
  }

  //#region filters modal
  openDateModal() {
    this.filterDialog = true;
  }

  closeDateModal() {
    this.filterDialog = false;
  }

  saveFilter() {
    this.closeDateModal();
  }
  //#endregion


  //#region requests modal
  openCreateRequestModal(): void {
    this.requestsDialog = true;
  }

  createRequests(): void {
    this.closeRequestsModal();
  }

  closeRequestsModal(): void {
    this.requestsDialog = false;
  }
  //#endregion
}
