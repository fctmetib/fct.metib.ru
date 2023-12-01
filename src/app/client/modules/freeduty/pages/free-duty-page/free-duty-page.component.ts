import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Observable, Subscription, filter, first, switchMap, tap, Subject, interval, BehaviorSubject, finalize} from 'rxjs';
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
import {takeUntil} from 'rxjs/operators';
import {AutoUnsubscribeService} from '../../../../../shared/services/auto-unsubscribe.service';
import {AdvancedDuty} from './interfaces/free-duty.interface';
import {DrawerStateEnum} from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface';
import {FreeDutyService} from '../../services/free-duty.service';
import {ToolsService} from '../../../../../shared/services/tools.service';
import {AnimationService} from '../../../../../shared/animations/animations.service';
import {trigger} from '@angular/animations';


@Component({
  selector: 'app-free-duty-page',
  templateUrl: './free-duty-page.component.html',
  styleUrls: ['./free-duty-page.component.scss'],
  providers: [AutoUnsubscribeService],
  animations: [
    new AnimationService().generateSlideOutAnimation({
      direction: 'left',
      translateDistance: '3%',
      endOpacity: 0.5,
      startOpacity: 1,
      duration: '300ms'
    })
  ]
})
export class FreeDutyPageComponent implements OnInit, OnDestroy {

  public test: any[]

  public loading$ = new BehaviorSubject<boolean>(false)

  public PAGINATOR_ITEMS_PER_PAGE = 16;
  public PAGINATOR_PAGE_TO_SHOW = 5;
  public currentPage: number = 1;

  public duties: AdvancedDuty[] = []
  public dutiesVisible: AdvancedDuty[] = []

  public selectedDutiesCount: number = 0
  public severalDutiesChecked: boolean = false;

  constructor(
    private au: AutoUnsubscribeService,
    private freeDutyService: FreeDutyService,
    private toolsService: ToolsService,
    private freeDutyRequestDrawerService: FreeDutyRequestDrawerService
  ) {
  }

  ngOnInit() {
    this.loading$.next(true)
    this.freeDutyService.getFreeDuty().pipe(
      tap(data => {
        this.duties = data.map(x => ({...x, checked: false}));
        this.onPageChange(this.currentPage)
      }),
      finalize(() => this.loading$.next(false))
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
        this.selectedDuties.forEach(duty => this.removeDutyById(duty.ID))
        this.onPageChange(this.currentPage)
      })
    ).subscribe()
  }

  removeDutyById(id: number) {
    const index = this.duties.findIndex(duty => duty.ID === id);
    if (index > -1) {
      this.duties.splice(index, 1);
    }
  }

  onPageChange(page: number) {
    this.currentPage = page;

    const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE;
    const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE;

    this.selectedDutiesCount = 0
    this.severalDutiesChecked = false;

    this.dutiesVisible = this.duties.slice(startIndex, endIndex);
  }

  onRowCheck(boolean: boolean, duty: AdvancedDuty) {
    duty.checked = boolean

    this.selectedDutiesCount = this.selectedDuties.length
  }

  get selectedDuties() {
    return this.dutiesVisible.filter(x => x.checked)
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
