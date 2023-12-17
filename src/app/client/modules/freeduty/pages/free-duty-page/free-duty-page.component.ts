import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {
  Observable,
  Subscription,
  filter,
  first,
  switchMap,
  tap,
  Subject,
  interval,
  BehaviorSubject,
  finalize,
  zip,
  forkJoin,
  map
} from 'rxjs';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import {DatePipe} from '@angular/common';
import {DutyFilterRequestInterface} from 'src/app/shared/types/duty/duty-filter-request.interface';
import {Duty} from 'src/app/shared/types/duty/duty';
import {SelectedItemSortedInterface} from '../../types/common/selected-item-sorted.interface';
import {DutyService} from 'src/app/shared/services/share/duty.service';
import {Router} from '@angular/router';
import {FreedutyStoreService} from '../../../../../shared/services/store/freeduty.store.service';
import {ClientService} from 'src/app/shared/services/common/client.service';
import {AuthService} from 'src/app/auth/services/auth.service';
import {FreeDutyRequestDrawerService} from '../../modules/free-duty-request-drawer/free-duty-request-drawer.service';
import {startWith, takeUntil} from 'rxjs/operators';
import {AutoUnsubscribeService} from '../../../../../shared/services/auto-unsubscribe.service';
import {AdvancedDuty} from './interfaces/free-duty.interface';
import {DrawerStateEnum} from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface';
import {FreeDutyService} from '../../services/free-duty.service';
import {ToolsService} from '../../../../../shared/services/tools.service';
import {AnimationService} from '../../../../../shared/animations/animations.service';
import {Properties} from 'csstype';
import {TableDataService} from '../../../../../shared/ui-kit/table/services/table.service';
import {validate} from 'codelyzer/walkerFactory/walkerFn';

const ANIMATION_CONFIG = {
  translateDistance: '-3%',
  endOpacity: 0,
  startOpacity: 1,
  duration: 300
}

@Component({
  selector: 'app-free-duty-page',
  templateUrl: './free-duty-page.component.html',
  styleUrls: ['./free-duty-page.component.scss'],
  providers: [AutoUnsubscribeService],
  animations: [
    new AnimationService().generateAnimation(ANIMATION_CONFIG)
  ]
})
export class FreeDutyPageComponent implements OnInit, OnDestroy {

  public loading$ = new BehaviorSubject<boolean>(false)

  public skeletonWithoutUnderline: Properties = {
    height: '48px',
    width: '100%'
  };
  public skeleton: Properties = {
    ...this.skeletonWithoutUnderline,
    borderBottom: '1px solid var(--wgr-tertiary)'
  };

  options: any[] = [
    {
      text: 'Рафлс',
      value: 1
    },
    {
      text: 'Не рафлс',
      value: 2
    },
    {
      text: 'Комару',
      value: 3
    },
    {
      text: 'Че ты творишь',
      value: 4
    },
  ]
  filtered: Observable<string[]>;


  public control: FormControl = new FormControl<any>(2)

  public PAGINATOR_ITEMS_PER_PAGE = 16;
  public PAGINATOR_PAGE_TO_SHOW = 5;
  public currentPage: number = 1;

  public duties$ = new BehaviorSubject<AdvancedDuty[]>([])
  public dutiesVisible: AdvancedDuty[] = []
  public dutyAnimationStates: Record<number, boolean> = {};

  public selectedDutiesCount: number = 0
  public severalDutiesChecked: boolean = false;

  constructor(
    private au: AutoUnsubscribeService,
    private freeDutyService: FreeDutyService,
    private toolsService: ToolsService,
    private tableDataService: TableDataService,
    private freeDutyRequestDrawerService: FreeDutyRequestDrawerService
  ) {
  }

  private _filter(value: any): string[] {
    let filterValue = '';

    // Проверяем, является ли value строкой, если нет, пробуем привести к строке
    if (typeof value === 'string') {
      filterValue = value.toLowerCase();
    } else if (value != null && value.toString) {
      filterValue = value.toString().toLowerCase();
    }

    console.log(filterValue);

    // Фильтруем опции
    const filteredOptions = this.options.filter(option =>
      option.text.toLowerCase().includes(filterValue)
    );

    console.log(filteredOptions);

    // Возвращаем отфильтрованные опции
    return filteredOptions;
  }

  ngOnInit() {

    this.filtered = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.control.valueChanges.pipe(
      tap(val => console.log(val))
    ).subscribe()
    this.loading$.next(true)
    this.freeDutyService.getFreeDuty().pipe(
      tap(data => {
        this.duties$.next(data.map(x => ({...x, checked: false})));
        // Инициализация состояния анимации
        this.duties$.value.forEach(duty => {
          this.dutyAnimationStates[duty.ID] = false;
        });
      }),
      finalize(() => this.loading$.next(false))
    ).subscribe()
    this.duties$.pipe(
      tap(() => {
        this.onPageChange(this.currentPage);
      }),
      takeUntil(this.au.destroyer)
    ).subscribe()
  }

  ngOnDestroy() {
  }

  openDrawer() {
    this.freeDutyRequestDrawerService.open<AdvancedDuty[]>({
      state: DrawerStateEnum.CREATE,
      data: this.selectedDuties
    }).afterClosed().pipe(
      filter(Boolean),
      tap(() => {
        forkJoin(this.selectedDuties.map(duty => this.removeDutyById(duty.ID))).subscribe(() => {
          this.onPageChange(this.currentPage)
        })
      })
    ).subscribe()
  }

  removeDutyById(id: number): Observable<void> {
    return new Observable(observer => {
      // Изменение состояния анимации
      this.dutyAnimationStates[id] = true;

      // Устанавливаем таймер для удаления элемента после завершения анимации
      setTimeout(() => {
        // Удаляем элемент по ID
        this.duties$.next(this.duties$.value.filter(duty => duty.ID !== id));
        observer.next(); // Сигнал об успешном выполнении
        observer.complete(); // Завершаем Observable
      }, ANIMATION_CONFIG.duration - 10);
    });
  }


  onPageChange(page: number) {
    this.currentPage = page;

    const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE;
    const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE;

    this.selectedDutiesCount = 0
    this.severalDutiesChecked = false;

    this.dutiesVisible = this.duties$.value.slice(startIndex, endIndex);
  }

  onRowCheck(boolean: boolean, duty: AdvancedDuty) {
    duty.checked = boolean

    this.selectedDutiesCount = this.selectedDuties.length
  }

  get selectedDuties() {
    return this.dutiesVisible.filter(x => x.checked)
  }

  public onSort(ascending: boolean, key: string) {
    this.duties$.next(this.tableDataService.sortData(this.duties$.value, ascending, key))
  }

  public onSortByDates(ascending: boolean, key: string) {
    this.duties$.next(this.tableDataService.sortDataByDate(this.duties$.value, ascending, key))
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
