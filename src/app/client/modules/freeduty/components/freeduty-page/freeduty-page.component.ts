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
import { SelectedItemSortedInterface } from '../../types/common/selected-item-sorted.interface';
import { DutyService } from 'src/app/shared/services/share/duty.service';
import { Router } from '@angular/router';

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
  selectedItemsSorted: SelectedItemSortedInterface[] = [];

  filterForm: FormGroup;


  filterDialog: boolean = false;
  requestsDialog: boolean = false;

  organizationId: number;
  requestsDialogAlert: string;

  successRequestsDialogMessage: string = null;
  errorRequestsDialogMessage: string = null;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private router: Router,
    private service: DutyService,
    public dialogService: DialogService,
    public datepipe: DatePipe
  ) {}

  ngOnInit() {
    this.initializeValues();
    this.initializeForm();
    this.fetch(true);
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
    this.fetch(false);
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

  getFreedutySum(dutyItems: DutyInterface[]) {
    if(dutyItems) {
    return dutyItems.reduce((sum, current) =>
      sum + current.Summ, 0
    )
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
    this.selectedItemsSorted = [];
    this.successRequestsDialogMessage = null;
    this.errorRequestsDialogMessage = null;

    this.requestsDialog = true;

    this.selectedItems.forEach((selectedItem) => {
      let selectedItemSort = this.selectedItemsSorted.find(
        (x) => x.contract === selectedItem.Contract.Title
      );
      if (selectedItemSort) {
        selectedItemSort.categories[0].requests.push({
          id: selectedItem.ID,
          number: selectedItem.Number,
          date: selectedItem.DateDuty,
          summ: selectedItem.Summ,
        });

        let requestsSumm = selectedItemSort.categories[0].requests
          .map((item) => item.summ)
          .reduce((sum, current) => sum + current, 0);

        selectedItemSort.categories[0].summ = requestsSumm;

        let categoriesSum = selectedItemSort.categories
          .map((item) => item.summ)
          .reduce((sum, current) => sum + current, 0);

        selectedItemSort.summ = categoriesSum;
      } else {
        this.selectedItemsSorted.push({
          summ: selectedItem.Summ,
          categories: [
            {
              categoryName: '1',
              summ: selectedItem.Summ,
              requests: [
                {
                  id: selectedItem.ID,
                  number: selectedItem.Number,
                  date: selectedItem.DateDuty,
                  summ: selectedItem.Summ,
                },
              ],
            },
          ],
          contract: selectedItem.Contract.Title,
        });
      }
    });
  }

  createRequests(): void {
    this.successRequestsDialogMessage = null;
    this.errorRequestsDialogMessage = null;

    let categories = this.selectedItemsSorted.map((i) => i.categories);

    let requestsId = categories.map((c) =>
      c.map((r) => r.requests.map((i) => i.id))
    );

    let flattenedRequestsId: number[] = [];

    requestsId.forEach((c) => {
      c.forEach((i) => {
        i.forEach((s) => {
          flattenedRequestsId.push(s);
        });
      });
    });

    this.service.createRequestsByDutyIds(flattenedRequestsId).subscribe(
      (response) => {
        this.closeRequestsModal();
        this.router.navigate(['/requests']);
      },
      (err) => {
        this.errorRequestsDialogMessage = err.error;
      }
    );

    //  this.closeRequestsModal();
  }

  closeRequestsModal(): void {
    this.requestsDialog = false;
  }

  //#endregion
}
