import {
  BehaviorSubject,
  zip,
  finalize,
  filter,
  tap, switchMap, merge, forkJoin
} from 'rxjs'
import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core'
import {RequestsService} from '../../services/requests.service'
import {Properties} from 'csstype'
import {RequestDrawerService} from '../../modules/request-drawer/request-drawer.service'
import {DrawerStateEnum} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {RequestBrowserDrawerService} from '../../modules/request-browser-drawer/request-browser-drawer.service'
import {FormControl} from '@angular/forms';
import {ToolsService} from '../../../../../shared/services/tools.service';
import {takeUntil} from 'rxjs/operators';
import {AutoUnsubscribeService} from '../../../../../shared/services/auto-unsubscribe.service';
import {TableRowAnimationService} from '../../../../../shared/ui-kit/table/services/table-row-animation.service';
import {TableSelectionEvent} from '../../../../../shared/ui-kit/table/interfaces/table.interface';
import {TableComponent} from '../../../../../shared/ui-kit/table/table.component';
import {RequestRes} from '../../interfaces/request.interface';
import {SignService} from '../../../../../shared/services/share/sign.service';
import {SignPinModalService} from '../../../../../shared/modules/modals/sign-pin-modal/sign-pin-modal.service';
import {DatesService} from '../../../../../shared/services/dates.service';

@Component({
  selector: 'app-requests-page',
  templateUrl: './requests-page.component.html',
  styleUrls: ['./requests-page.component.scss'],
  providers: [AutoUnsubscribeService]
})
export class RequestsPageComponent implements OnInit, OnDestroy {

  @ViewChild(TableComponent) table: TableComponent

  public isSigningPreparing$ = new BehaviorSubject<boolean>(false)
  public loading$ = new BehaviorSubject<boolean>(false)

  public skeletonWithoutUnderline: Properties = {
    height: '48px',
    width: '100%'
  }
  public skeleton: Properties = {
    ...this.skeletonWithoutUnderline,
    borderBottom: '1px solid var(--wgr-tertiary)'
  }

  public PAGINATOR_ITEMS_PER_PAGE = 16
  public PAGINATOR_PAGE_TO_SHOW = 5
  public currentPage$ = new BehaviorSubject<number>(1)

  public requests: RequestRes[] = []
  public requestsVisible: RequestRes[] = []
  public requestsSelection: TableSelectionEvent = {
    selectedCount: 0,
    selectedIds: []
  }

  public dateFrom: FormControl = new FormControl<string>('')
  public dateTo: FormControl = new FormControl<string>('')

  constructor(
    public toolsService: ToolsService,
    private datesService: DatesService,
    private requestsService: RequestsService,
    private requestDrawerService: RequestDrawerService,
    private requestBrowserDrawerService: RequestBrowserDrawerService,
    private au: AutoUnsubscribeService,
    private tableRowAnimationService: TableRowAnimationService,
    private signService: SignService,
    private signPinModalService: SignPinModalService
  ) {
  }

  get selectedRequests() {
    return this.requests.filter(request => this.requestsSelection.selectedIds.includes(request.ID))
  }

  ngOnInit() {
    const {dateFrom, dateTo} = this.datesService.convertDatesInObjectToInput({
      dateFrom: this.toolsService.subtractFromDate(new Date(), {days: 14}).toISOString(),
      dateTo: new Date().toISOString()
    })
    console.log(dateTo, dateFrom)
    this.dateFrom.setValue(dateFrom)
    this.dateTo.setValue(dateTo)

    this.loadRequestsData().subscribe()
    this.watchForms()
  }

  ngOnDestroy() {
  }

  loadRequestsData() {
    this.loading$.next(true)

    const req = {}
    const setOptionalDate = (date: string, key: string) => {
      if (date) req[key] = new Date(date).toISOString()
    }
    setOptionalDate(this.dateFrom.value, 'dateFrom')
    setOptionalDate(this.dateTo.value, 'dateTo')

    return this.requestsService.getRequests(req).pipe(
      tap(data => {
        this.requests = data
        this.onPageChange(this.currentPage$.value)
      }),
      finalize(() => this.loading$.next(false))
    )
  }

  openDrawer() {
    this.requestDrawerService.open({state: DrawerStateEnum.CREATE}).afterClosed().pipe(
      filter(Boolean),
      switchMap(() => this.loadRequestsData())
    ).subscribe()
  }

  removeRequestById(id: number) {
    const splice = array => {
      const index = array.findIndex(req => req.ID === id);
      if (index > -1) {
        array.splice(index, 1);
      }
    };

    splice(this.requests)
    splice(this.requestsVisible)
  }

  openBrowserDrawer(requestId: number) {
    this.requestBrowserDrawerService.open({
      data: {
        requestId: requestId
      }
    }).afterClosed().pipe(
      filter(Boolean),
      switchMap(() => this.loadRequestsData())
    ).subscribe()
  }

  onPageChange(page: number) {
    this.currentPage$.next(page)

    const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE
    const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE

    this.table.deselect()

    this.requestsVisible = this.requests.slice(startIndex, endIndex)
  }

  private watchForms() {
    merge(this.dateFrom.valueChanges, this.dateTo.valueChanges).pipe(
      switchMap(() => this.loadRequestsData()),
      tap(() => {
        this.onPageChange(1);
      }),
      takeUntil(this.au.destroyer)
    ).subscribe();
  }

  refresh() {
    this.loadRequestsData().subscribe()
  }

  selectionChange(event: TableSelectionEvent) {
    this.requestsSelection = event;
  }

  deleteRequests(ids: number[]) {
    zip(
      this.requestsService.deleteRequests(ids),
      forkJoin(
        ids.map(id => this.tableRowAnimationService.animateRowAndAwaitCompletion(id).pipe(
          tap(() => this.removeRequestById(id))
        ))
      )
    ).pipe(
      finalize(() => this.onPageChange(this.currentPage$.value))
    ).subscribe()
  }

  requestSign(): void {
    const requestIDs = this.table.selectedRows.map(req => req.rowId);
    this.isSigningPreparing$.next(true)
    this.requestsService.sign(requestIDs, this.isSigningPreparing$).pipe(
      switchMap(() => this.loadRequestsData()),
      finalize(() => this.isSigningPreparing$.next(false))
    ).subscribe()
  }

}
