import {FormControl} from '@angular/forms';
import {
  filter,
  switchMap,
  tap,
  BehaviorSubject,
  finalize,
  forkJoin, merge, zip,
} from 'rxjs';
import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Duty} from 'src/app/shared/types/duty/duty';
import {FreeDutyRequestDrawerService} from '../../modules/free-duty-request-drawer/free-duty-request-drawer.service';
import {takeUntil} from 'rxjs/operators';
import {AutoUnsubscribeService} from '../../../../../shared/services/auto-unsubscribe.service';
import {DrawerStateEnum} from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface';
import {FreeDutyService} from '../../services/free-duty.service';
import {ToolsService} from '../../../../../shared/services/tools.service';
import {Properties} from 'csstype';
import {TableDataService} from '../../../../../shared/ui-kit/table/services/table.service';
import {DataCount} from '../../../../../shared/interfaces/shared.interface';
import {TableRowAnimationService} from '../../../../../shared/ui-kit/table/services/table-row-animation.service';
import {TableSelectionEvent} from '../../../../../shared/ui-kit/table/interfaces/table.interface';
import {TableComponent} from '../../../../../shared/ui-kit/table/table.component';

@Component({
  selector: 'app-free-duty-page',
  templateUrl: './free-duty-page.component.html',
  styleUrls: ['./free-duty-page.component.scss'],
  providers: [AutoUnsubscribeService],
})
export class FreeDutyPageComponent implements OnInit, OnDestroy {

  @ViewChild(TableComponent) table: TableComponent

  public loading$ = new BehaviorSubject<boolean>(false)

  public skeletonWithoutUnderline: Properties = {
    height: '48px',
    width: '100%'
  };
  public skeleton: Properties = {
    ...this.skeletonWithoutUnderline,
    borderBottom: '1px solid var(--wgr-tertiary)'
  };

  public control: FormControl = new FormControl<any>(2)

  public PAGINATOR_ITEMS_PER_PAGE = 16;
  public PAGINATOR_PAGE_TO_SHOW = 5;

  public currentPage$ = new BehaviorSubject<number>(1)

  public dutiesCount?: DataCount
  public duties$ = new BehaviorSubject<Duty[]>([])
  public dutiesSelection: TableSelectionEvent = {
    selectedCount: 0,
    selectedIds: []
  }
  public selectedDuties: Duty[] = []

  public freeOnly: boolean = true;
  public dateFrom = new FormControl<string>('')
  public dateTo = new FormControl<string>('')

  constructor(
    private au: AutoUnsubscribeService,
    private freeDutyService: FreeDutyService,
    public toolsService: ToolsService,
    private tableDataService: TableDataService,
    private freeDutyRequestDrawerService: FreeDutyRequestDrawerService,
    private tableRowAnimationService: TableRowAnimationService
  ) {
  }

  selectTab(freeOnly: boolean) {
    this.freeOnly = freeOnly;
    this.onPageChange(1)
  }

  ngOnInit() {
    this.currentPage$.pipe(
      switchMap(() => {
        this.loading$.next(true)
        const req = {
          freeOnly: this.freeOnly,
          rowsOnPage: this.PAGINATOR_ITEMS_PER_PAGE,
          offSet: this.currentPage$.value,
        }

        const setOptionalDate = (date: string, key: string) => {
          if (date) req[key] = new Date(date).toISOString()
        }

        setOptionalDate(this.dateFrom.value, 'dateFrom')
        setOptionalDate(this.dateTo.value, 'dateTo')

        return zip(
          this.freeDutyService.getFreeDuties(req).pipe(tap(duties => this.duties$.next(duties))),
          this.freeDutyService.getFreeDutyCount(req).pipe(tap(data => this.dutiesCount = data)
          ).pipe(
            finalize(() => this.loading$.next(false))
          )
        )
      }),
      takeUntil(this.au.destroyer)
    ).subscribe()

    this.watchForms()
  }

  ngOnDestroy() {
  }

  openDrawer() {
    this.freeDutyRequestDrawerService.open({
      state: DrawerStateEnum.CREATE,
      data: this.selectedDuties
    }).afterClosed().pipe(
      filter(Boolean),
      tap(() => {
        forkJoin(this.selectedDuties.map(duty => this.tableRowAnimationService.animateRowAndAwaitCompletion(duty.ID).pipe(
          tap(() => {
            this.removeDutyById(duty.ID)
          })
        ))).pipe(
          finalize(() => this.onPageChange(this.currentPage$.value))
        ).subscribe()
      })
    ).subscribe()
  }

  removeDutyById(id: number) {
    this.duties$.next(this.duties$.value.filter(duty => duty.ID !== id));
  }

  onPageChange(page: number) {
    this.currentPage$.next(page);
    this.table.deselect()
  }

  public onSort(ascending: boolean, key: string) {
    this.duties$.next(this.tableDataService.sortData(this.duties$.value, ascending, key))
  }

  public onSortByDates(ascending: boolean, key: string) {
    this.duties$.next(this.tableDataService.sortDataByDate(this.duties$.value, ascending, key))
  }

  private watchForms() {
    merge(this.dateFrom.valueChanges, this.dateTo.valueChanges).pipe(
      tap(() => {
        this.onPageChange(1);
      }),
      takeUntil(this.au.destroyer)
    ).subscribe();
  }

  onSelectionChanged(event: TableSelectionEvent) {
    this.dutiesSelection = event;
    this.selectedDuties = this.duties$.value.filter(duty => event.selectedIds.includes(duty.ID))
  }

  // freeduty$: Observable<DutyInterface[] | null>;
  // loading$: Observable<boolean>;
  //
  // selectedItems: DutyInterface[] = [];
  // selectedItemsSorted: SelectedItemSortedInterface[] = [];
  //
  // filterForm: FormGroup;
  //
  //
  // filterDialog: boolean = false;
  // requestsDialog: boolean = false;
  //
  // organizationId: number;
  // requestsDialogAlert: string;
  //
  // successRequestsDialogMessage: string = null;
  // errorRequestsDialogMessage: string = null;
  //
  // private subscription$: Subscription = new Subscription();
  //
  // constructor(
  //   private fb: FormBuilder,
  //   private router: Router,
  //   private storeService: FreedutyStoreService,
  //   private service: DutyService,
  //   private authService: AuthService,
  //   private clientService: ClientService,
  //   public dialogService: DialogService,
  //   public datepipe: DatePipe,
  //
  //
  //
  //
  //
  //   private freeDutyRequestDrawerService: FreeDutyRequestDrawerService
  // ) {
  // }
  //
  // ngOnInit() {
  //   this.initializeValues();
  //   this.initializeForm();
  // }
  //
  // initializeValues(): void {
  //   this.authService.currentUser$.pipe(
  //     filter(Boolean),
  //     first(),
  //     switchMap((user) => this.clientService.getClientFactoringById(+user?.userFactoring?.OrganizationID)),
  //     tap((result) => {
  //       if (result) {
  //         this.organizationId = result.ID;
  //         this.fetch(true, false);
  //       }
  //     })
  //   ).subscribe();
  // }
  //
  // initializeForm() {
  //   let from = new Date();
  //   let to = new Date();
  //   from.setMonth(from.getMonth() - 1);
  //
  //   this.filterForm = this.fb.group({
  //     dateFrom: [
  //       this.datepipe.transform(from, 'yyyy-MM-dd'),
  //       [Validators.required],
  //     ],
  //     dateTo: [
  //       this.datepipe.transform(to, 'yyyy-MM-dd'),
  //       [Validators.required],
  //     ],
  //   });
  // }
  //
  // applyFilters(): void {
  //   this.fetch(true, true);
  // }
  //
  // showAll(): void {
  //   this.fetch(false, true);
  // }
  //
  // fetch(isFree: boolean, isRefresh: boolean): void {
  //   if (this.filterForm.value.dateFrom && this.filterForm.value.dateTo) {
  //     if (this.organizationId) {
  //       let data: DutyFilterRequestInterface = {
  //         // CustomerID: this.organizationId,
  //         dateFrom: new Date(this.filterForm.value.dateFrom),
  //         dateTo: new Date(this.filterForm.value.dateTo),
  //         freeOnly: isFree,
  //       };
  //
  //       this.freeduty$ = this.storeService.getFreeDuty(); // .getFreeduty(data, isRefresh);
  //       this.loading$ = this.storeService.getLoading();
  //     }
  //   }
  // }
  //
  // getFreedutySum(dutyItems: DutyInterface[]) {
  //   if (dutyItems) {
  //     return dutyItems.reduce((sum, current) =>
  //       sum + current.Summ, 0
  //     )
  //   }
  // }
  //
  // //#region filters modal
  // openDateModal() {
  //   this.filterDialog = true;
  // }
  //
  // closeDateModal() {
  //   this.filterDialog = false;
  // }
  //
  // saveFilter() {
  //   this.closeDateModal();
  // }
  //
  // //#endregion
  //
  // //#region requests modal
  // openCreateRequestModal(): void {
  //   this.selectedItemsSorted = [];
  //   this.successRequestsDialogMessage = null;
  //   this.errorRequestsDialogMessage = null;
  //
  //   this.requestsDialog = true;
  //
  //   this.selectedItems.forEach((selectedItem) => {
  //     let selectedItemSort = this.selectedItemsSorted.find(
  //       (x) => x.contract === selectedItem.Contract.Title
  //     );
  //     if (selectedItemSort) {
  //       selectedItemSort.categories[0].requests.push({
  //         id: selectedItem.ID,
  //         number: selectedItem.Number,
  //         date: selectedItem.DateDuty,
  //         summ: selectedItem.Summ,
  //       });
  //
  //       let requestsSumm = selectedItemSort.categories[0].requests
  //         .map((item) => item.summ)
  //         .reduce((sum, current) => sum + current, 0);
  //
  //       selectedItemSort.categories[0].summ = requestsSumm;
  //
  //       let categoriesSum = selectedItemSort.categories
  //         .map((item) => item.summ)
  //         .reduce((sum, current) => sum + current, 0);
  //
  //       selectedItemSort.summ = categoriesSum;
  //     } else {
  //       this.selectedItemsSorted.push({
  //         summ: selectedItem.Summ,
  //         categories: [
  //           {
  //             categoryName: '1',
  //             summ: selectedItem.Summ,
  //             requests: [
  //               {
  //                 id: selectedItem.ID,
  //                 number: selectedItem.Number,
  //                 date: selectedItem.DateDuty,
  //                 summ: selectedItem.Summ,
  //               },
  //             ],
  //           },
  //         ],
  //         contract: selectedItem.Contract.Title,
  //       });
  //     }
  //   });
  // }
  //
  // createRequests(): void {
  //   this.successRequestsDialogMessage = null;
  //   this.errorRequestsDialogMessage = null;
  //
  //   let categories = this.selectedItemsSorted.map((i) => i.categories);
  //
  //   let requestsId = categories.map((c) =>
  //     c.map((r) => r.requests.map((i) => i.id))
  //   );
  //
  //   let flattenedRequestsId: number[] = [];
  //
  //   requestsId.forEach((c) => {
  //     c.forEach((i) => {
  //       i.forEach((s) => {
  //         flattenedRequestsId.push(s);
  //       });
  //     });
  //   });
  //
  //   // this.subscription$.add(this.subscription$.add(this.service.createRequestsByDutyIds(flattenedRequestsId).subscribe(
  //   //   (response) => {
  //   //     this.closeRequestsModal();
  //   //     this.router.navigate(['/client/requests']);
  //   //   },
  //   //   (err) => {
  //   //     this.errorRequestsDialogMessage = err.error;
  //   //   }
  //   // )));
  // }
  //
  // closeRequestsModal(): void {
  //   this.requestsDialog = false;
  // }
  //
  // ngOnDestroy() {
  //   this.subscription$.unsubscribe();
  // }
  //
  // //#endregion
}
