import {
  BehaviorSubject,
  finalize,
  filter,
  tap, switchMap, merge, forkJoin
} from 'rxjs'
import {Component, OnInit, OnDestroy} from '@angular/core'
import {RequestsService} from '../../services/requests.service'
import {Properties} from 'csstype'
import {AdvancedRequests} from './interfaces/requests-page.interface'
import {RequestDrawerService} from '../../modules/request-drawer/request-drawer.service'
import {DrawerStateEnum} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {RequestBrowserDrawerService} from '../../modules/request-browser-drawer/request-browser-drawer.service'
import {FormControl} from '@angular/forms';
import {ToolsService} from '../../../../../shared/services/tools.service';
import {takeUntil} from 'rxjs/operators';
import {AutoUnsubscribeService} from '../../../../../shared/services/auto-unsubscribe.service';
import {TableRowAnimationService} from '../../../../../shared/ui-kit/table/services/table-row-animation.service';

@Component({
  selector: 'app-requests-page',
  templateUrl: './requests-page.component.html',
  styleUrls: ['./requests-page.component.scss'],
  providers: [AutoUnsubscribeService]
})
export class RequestsPageComponent implements OnInit, OnDestroy {

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

  public requests: AdvancedRequests[] = []
  public requestsVisible: AdvancedRequests[] = []

  public selectedRequestCount: number = 0
  public severalRequestsChecked: boolean = false

  public dateFrom: FormControl = new FormControl<string>('')
  public dateTo: FormControl = new FormControl<string>('')

  constructor(
    private requestsService: RequestsService,
    private requestDrawerService: RequestDrawerService,
    private requestBrowserDrawerService: RequestBrowserDrawerService,
    private toolsService: ToolsService,
    private au: AutoUnsubscribeService,
    private tableRowAnimationService: TableRowAnimationService
  ) {
  }

  ngOnInit() {
    const {dateFrom, dateTo} = this.toolsService.convertDatesInObjectToInput({
      dateFrom: this.toolsService.subtractFromDate(new Date(), {days: 14}).toISOString(),
      dateTo: new Date().toISOString()
    })
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
        this.requests = data.map(x => ({...x, checked: false}))
        this.onPageChange(this.currentPage$.value)
      }),
      finalize(() => this.loading$.next(false))
    )
  }

  openDrawer() {
    this.requestDrawerService
      .open<AdvancedRequests[]>({
        state: DrawerStateEnum.CREATE,
        data: this.selectedRequests
      })
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap(() => {
          forkJoin(
            this.selectedRequests.map(request => this.tableRowAnimationService.animateRowAndAwaitCompletion(request.ID).pipe(
              tap(() => {
                this.removeRequestById(request.ID);
              })
            ))
          ).pipe(
            finalize(() => this.onPageChange(this.currentPage$.value))
          ).subscribe()
        })
      )
      .subscribe()
  }

  // Метод удаления строки по ID
  removeRequestById(id: number) {
    // Здесь логика удаления строки из данных компонента
    // Например, если это массив объектов с ID
    this.requests = this.requests.filter(request => request.ID !== id);
  }

  openBrowserDrawer(requestId: number) {
    this.requestBrowserDrawerService.open({
      data: {
        requestId: requestId
      }
    })
  }

  onPageChange(page: number) {
    this.currentPage$.next(page)

    const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE
    const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE

    this.selectedRequestCount = 0
    this.severalRequestsChecked = false

    this.requestsVisible = this.requests.slice(startIndex, endIndex)
  }

  onRowCheck(boolean: boolean, req: AdvancedRequests) {
    req.checked = boolean

    this.selectedRequestCount = this.selectedRequests.length
  }

  get selectedRequests() {
    return this.requestsVisible.filter(x => x.checked)
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

  // ---------------- end test data/methods ----------------

  // МОЖНО СМОТРЕТЬ МЕТОДЫ, НО НЕ ПОЛЬЗОВАТЬСЯ ТЕМ, ЧТО НИЖЕ
  // МОЖНО СМОТРЕТЬ МЕТОДЫ, НО НЕ ПОЛЬЗОВАТЬСЯ ТЕМ, ЧТО НИЖЕ
  // МОЖНО СМОТРЕТЬ МЕТОДЫ, НО НЕ ПОЛЬЗОВАТЬСЯ ТЕМ, ЧТО НИЖЕ
  // МОЖНО СМОТРЕТЬ МЕТОДЫ, НО НЕ ПОЛЬЗОВАТЬСЯ ТЕМ, ЧТО НИЖЕ
  // МОЖНО СМОТРЕТЬ МЕТОДЫ, НО НЕ ПОЛЬЗОВАТЬСЯ ТЕМ, ЧТО НИЖЕ
  // МОЖНО СМОТРЕТЬ МЕТОДЫ, НО НЕ ПОЛЬЗОВАТЬСЯ ТЕМ, ЧТО НИЖЕ
  // МОЖНО СМОТРЕТЬ МЕТОДЫ, НО НЕ ПОЛЬЗОВАТЬСЯ ТЕМ, ЧТО НИЖЕ
  // МОЖНО СМОТРЕТЬ МЕТОДЫ, НО НЕ ПОЛЬЗОВАТЬСЯ ТЕМ, ЧТО НИЖЕ
  // МОЖНО СМОТРЕТЬ МЕТОДЫ, НО НЕ ПОЛЬЗОВАТЬСЯ ТЕМ, ЧТО НИЖЕ
  // МОЖНО СМОТРЕТЬ МЕТОДЫ, НО НЕ ПОЛЬЗОВАТЬСЯ ТЕМ, ЧТО НИЖЕ
  // МОЖНО СМОТРЕТЬ МЕТОДЫ, НО НЕ ПОЛЬЗОВАТЬСЯ ТЕМ, ЧТО НИЖЕ

  // public requests$: Observable<RequestsResponseInterface[] | null>;
  // public loading$: Observable<boolean>;
  //
  // public selectedRequest: RequestsResponseInterface;
  //
  // public displayModal: boolean;
  // public ref: DynamicDialogRef;
  // public items: MenuItem[] = [];
  //
  // public confirmForm: FormGroup;
  // public confirmDialog: boolean = false;
  //
  // public selectedItems: RequestsResponseInterface[] = [];
  //
  // public successRequestsDialogMessage: string = null;
  // public errorRequestsDialogMessage: string = null;
  //
  // @ViewChildren(TableHighlightDirective)
  // tableHighlight: TableHighlightDirective;
  //
  // private refDocumentViewDialog: DynamicDialogRef;
  //
  // private subscription$: Subscription = new Subscription();
  //
  // constructor(
  //   public dialogService: DialogService,
  //   private fb: FormBuilder,
  //   private requestService: RequestsService,
  //   private requestStoreService: RequestStoreService,
  //   private signService: SignService,
  // ) { }
  //
  // public ngOnInit(): void {
  //   this.initializeValues();
  //   this.fetch();
  // }
  //
  // private initializeValues(): void {
  //   this.loading$ = this.requestStoreService.getLoading;
  //   this.items = [
  //     {
  //       // todo: нужно
  //       id: 'create',
  //       label: 'Создать',
  //       command: () => this.showCreateRequestDialog(),
  //     },
  //     // {
  //     //   id: 'edit',
  //     //   label: 'Редактировать',
  //     //   command: () => this.showEditDialog(),
  //     // },
  //     // {
  //     //   // todo: нужно
  //     //   id: 'createCorrection',
  //     //   label: 'Сделать коррекцию',
  //     //   command: () => this.showCorrectionDialog(),
  //     // },
  //     {
  //       // todo: нужно
  //       id: 'events',
  //       label: 'События',
  //       routerLink: '',
  //     },
  //     {
  //       // todo: нужно
  //       id: 'remove',
  //       label: 'Удалить',
  //       routerLink: '',
  //     },
  //     {
  //       // todo: нужно
  //       id: 'send',
  //       label: 'Отправить',
  //       command: () => this.initSend(),
  //     },
  //   ];
  //
  //   this.confirmForm = this.fb.group({
  //     pin: ['', [Validators.required]],
  //     confirmCode: [''],
  //   });
  // }
  //
  // public selectRow(request: RequestsResponseInterface): void {
  //   this.subscription$.add(
  //     this.requestService
  //       .getRequestByIdAndParams(request.ID, true, true, true)
  //       .subscribe((requestWithAdditionalData) => {
  //         this.selectedRequest = requestWithAdditionalData;
  //       })
  //   );
  // }
  //
  // public documentViewHandler(document: any): void {
  //   this.openDocumentViewer({
  //     document,
  //     requestID: this.selectedRequest.ID,
  //   });
  // }
  //
  // public refresh(): void {
  //   this.fetch(true);
  // }
  //
  // private fetch(isRefresh?: boolean): void {
  //   this.requestStoreService.clear();
  //   this.requests$ = this.requestStoreService.getRequests(isRefresh);
  // }
  //
  // private showCreateRequestDialog(): void {
  //   this.ref = this.dialogService.open(RequestCreateDialogComponent, {
  //     header: 'Создание заявки',
  //     width: '85%',
  //     contentStyle: { height: '800px', overflow: 'auto' },
  //     baseZIndex: 10000,
  //   });
  //
  //   this.ref.onClose.pipe(
  //     tap(() => {
  //       this.fetch();
  //     })
  //   ).subscribe();
  // }
  //
  // public customSort(event: SortEvent): void {
  //   // let requests: any[] = [];
  //   // console.log(event);
  //   // //TODO: COMPLETE FILTER
  //   // requests = [...event.data].sort((data1, data2) => {
  //   //   // console.log(data1['Number'])
  //   //   let value1 = data1[event.field];
  //   //   let value2 = data2[event.field];
  //   //   let result = null;
  //   //   if (value1 == null && value2 != null) {
  //   //     result = -1;
  //   //   } else if (value1 != null && value2 == null) {
  //   //     result = 1;
  //   //   } else if (value1 == null && value2 == null) {
  //   //     result = 0;
  //   //   } else if (typeof value1 === 'string' && typeof value2 === 'string') {
  //   //     result = value1.localeCompare(value2);
  //   //   } else {
  //   //     result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
  //   //   }
  //   //   return event.order * result;
  //   // });
  //   // this.requests = [...requests];
  // }
  //
  // private showCorrectionDialog(): void {
  //   this.ref = this.dialogService.open(RequestCorrectDialogComponent, {
  //     data: this.selectedItems,
  //     header: 'Заявка на коррекцию',
  //     width: '85%',
  //     baseZIndex: 10000,
  //   });
  // }
  //
  // private showEditDialog(): void {
  //   let selectedRow = this.selectedItems[0];
  //
  //   this.subscription$.add(
  //     this.requestService
  //       .getRequestByIdAndParams(selectedRow.ID, true, true, true)
  //       .subscribe((resp: RequestsResponseInterface): void => {
  //         selectedRow = resp;
  //
  //         if (selectedRow) {
  //           this.ref = this.dialogService.open(RequestCreateDialogComponent, {
  //             header: 'Редактирование заявки',
  //             width: '70%',
  //             contentStyle: { height: '800px', overflow: 'auto' },
  //             baseZIndex: 10000,
  //             data: selectedRow,
  //           });
  //         }
  //       })
  //   );
  // }
  //
  // private initSend(): void {
  //   let requestIDs = this.selectedItems.map((x: RequestsResponseInterface): any => x.ID);
  //   this.subscription$.add(
  //     this.signService.getActiveSession().pipe(
  //       switchMap((result) => {
  //         if (result) {
  //           return this.requestService.send(requestIDs).pipe(
  //             tap(() => this.fetch())
  //             )
  //         } else {
  //           return this.signService.getPin().pipe(
  //             tap(() => {
  //               this.confirmDialog = true;
  //             })
  //           )
  //         }
  //       }),
  //       tap(() => {
  //       })
  //     ).subscribe()
  //   );
  // }
  //
  // public confirmSend(): void {
  //   let requestIDs = this.selectedItems.map((x: RequestsResponseInterface): any => x.ID);
  //   this.successRequestsDialogMessage = null;
  //   this.errorRequestsDialogMessage = null;
  //
  //   this.subscription$.add(
  //     this.signService.createSession(this.confirmForm.value.pin).pipe(
  //       switchMap(() => this.requestService.send(requestIDs)),
  //       tap(() => {
  //         this.confirmDialog = false;
  //         this.fetch();
  //         this.successRequestsDialogMessage = 'Заявка успешно подтверждена';
  //       })
  //     ).subscribe()
  //   );
  // }
  //
  // public checkSelecteditems(): void {
  //   // TODO: rework on a better solution
  //   this.items.forEach((item: MenuItem): void => {
  //     switch (item.id) {
  //       case 'send':
  //       case 'remove':
  //         item.disabled = this.checkSelectedItemIsCreate();
  //         break;
  //       case 'edit':
  //         item.disabled = this.checkSelectedItemIsReadonly();
  //         break;
  //       case 'edit':
  //         item.disabled = this.checkSelectedItemIsCreate();
  //         break;
  //     }
  //   });
  // }
  //
  // // @HostListener('window:mouseup', ['$event'])
  // // mouseUp(event){
  // //   console.log('ff', event.target)
  // //   console.log(window.getSelection().getRangeAt(0))
  // //   let container: any = window.getSelection().getRangeAt(0).commonAncestorContainer
  // //   let children = container.children;
  // //   console.log(children)
  // //   let ff = this.tableHighlight;
  // //   console.log(ff)
  // // }
  //
  // private openDocumentViewer(document: any): void {
  //   this.refDocumentViewDialog = this.dialogService.open(
  //     DocumentViewDialogComponent,
  //     {
  //       header: 'Просмотр Документа',
  //       width: '50%',
  //       contentStyle: { 'max-height': '550px', overflow: 'auto' },
  //       baseZIndex: 10000,
  //       data: document,
  //     }
  //   );
  // }
  //
  // private checkSelectedItemIsReadonly(): boolean {
  //   let isFromDuty = this.selectedItems.filter((x) => x.ReadOnly === true);
  //   return isFromDuty.length > 0 ? true : false;
  // }
  //
  // private checkSelectedItemIsCreate(): boolean {
  //   let isCreated = this.selectedItems.filter((x) => x.Status !== 'Создана');
  //   return isCreated.length > 0 ? true : false;
  // }
  //
  // public ngOnDestroy(): void {
  //   this.subscription$.unsubscribe();
  //   if (this.ref) {
  //     this.ref.close();
  //   }
  // }
  refresh() {
    this.loadRequestsData().subscribe()
  }
}
