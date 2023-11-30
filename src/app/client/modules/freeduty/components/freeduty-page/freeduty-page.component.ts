import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription, filter, first, switchMap, tap } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DatePipe } from '@angular/common';
import { DutyFilterRequestInterface } from 'src/app/shared/types/duty/duty-filter-request.interface';
import { DutyInterface } from 'src/app/shared/types/duty/duty.interface';
import { SelectedItemSortedInterface } from '../../types/common/selected-item-sorted.interface';
import { DutyService } from 'src/app/shared/services/share/duty.service';
import { Router } from '@angular/router';
import { FreedutyStoreService } from '../../../../../shared/services/store/freeduty.store.service';
import { ClientService } from 'src/app/shared/services/common/client.service';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-free-duty-page',
  templateUrl: './free-duty-page.component.html',
  styleUrls: ['./free-duty-page.component.scss'],
  providers: [DatePipe],
})
export class FreedutyPageComponent implements OnInit, OnDestroy {
  freeduty$: Observable<DutyInterface[] | null>;
  loading$: Observable<boolean>;

  selectedItems: DutyInterface[] = [];
  selectedItemsSorted: SelectedItemSortedInterface[] = [];

  filterForm: FormGroup;


  filterDialog: boolean = false;
  requestsDialog: boolean = false;

  organizationId: number;
  requestsDialogAlert: string;

  successRequestsDialogMessage: string = null;
  errorRequestsDialogMessage: string = null;

  private subscription$: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storeService: FreedutyStoreService,
    private service: DutyService,
    private authService: AuthService,
    private clientService: ClientService,
    public dialogService: DialogService,
    public datepipe: DatePipe
  ) {}

  ngOnInit() {
    this.initializeValues();
    this.initializeForm();
  }

  initializeValues(): void {
    this.authService.currentUser$.pipe(
      filter(Boolean),
      first(),
      switchMap((user) => this.clientService.getClientFactoringById(+user?.userFactoring?.OrganizationID)),
      tap((result) => {
        if (result) {
          this.organizationId = result.ID;
          this.fetch(true, false);
        }
      })
    ).subscribe();
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
    this.fetch(true, true);
  }

  showAll(): void {
    this.fetch(false, true);
  }

  fetch(isFree: boolean, isRefresh: boolean): void {
    if (this.filterForm.value.dateFrom && this.filterForm.value.dateTo) {
      if (this.organizationId) {
        let data: DutyFilterRequestInterface = {
          // CustomerID: this.organizationId,
          dateFrom: new Date(this.filterForm.value.dateFrom),
          dateTo: new Date(this.filterForm.value.dateTo),
          freeOnly: isFree,
        };

        this.freeduty$ = this.storeService.getFreeDuty(); // .getFreeduty(data, isRefresh);
        this.loading$ = this.storeService.getLoading();
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

    this.subscription$.add(this.subscription$.add(this.service.createRequestsByDutyIds(flattenedRequestsId).subscribe(
      (response) => {
        this.closeRequestsModal();
        this.router.navigate(['/client/requests']);
      },
      (err) => {
        this.errorRequestsDialogMessage = err.error;
      }
    )));
  }

  closeRequestsModal(): void {
    this.requestsDialog = false;
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
  //#endregion
}
