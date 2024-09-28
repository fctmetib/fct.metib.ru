import {Component, OnInit} from '@angular/core'
import {
  BehaviorSubject,
  forkJoin,
  finalize,
  map,
  switchMap,
  tap,
  takeUntil
} from 'rxjs'
import {
  IDraftList,
  IHistoryList,
  IQueryList
} from '../mock-data-service/data.models'
import {DataService} from '../mock-data-service/data.srrvice'
import {AnimationService} from 'src/app/shared/animations/animations.service'
import {Properties} from 'csstype'
import {DemandDrawerService} from '../../modules/demand-drawer/demand-drawer.service'
import {DemandSignatureDrawerService} from '../../modules/demand-signature-drawer/demand-signature-drawer.service'
import {DemandSuretyDrawerService} from '../../modules/demand-surety-drawer/demand-surety-drawer.service'
import {DemandEditingDrawerService} from '../../modules/demand-editing-drawer/demand-editing-drawer.service'
import {DemandLimitDrawerService} from '../../modules/demand-limit-drawer/demand-limit-drawer.service'
import {DemandDebtorDrawerService} from '../../modules/demand-debtor-drawer/demand-debtor-drawer.service'
import {
  DemandVerificationDrawerService
} from '../../modules/demand-verification-drawer/demand-verification-drawer.service'
import {DemandFactoringDrawerService} from '../../modules/demand-factoring-drawer/demand-factoring-drawer.service'
import {DemandAgentDrawerService} from '../../modules/demand-agent-drawer/demand-agent-drawer.service'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'
import {DemandService} from '../../services/demand.service'
import {DatePipe} from '@angular/common'
import {MatDialog} from '@angular/material/dialog'
import {
  DemandPageHistoryModalComponent
} from 'src/app/shared/modules/modals/demand-page-history-modal/demand-page-history-modal.component'
import {DestroyService} from 'src/app/shared/services/common/destroy.service'

const ANIMATION_CONFIG = {
  translateDistance: '-3%',
  endOpacity: 0,
  startOpacity: 1,
  duration: 300
}

export enum DialogType {
  Signature = 1,
  Surety, //поручительство
  Profile,
  Limit,
  Debitor,
  Verify,
  Free
}

export enum TabType {
  Request,
  Draft,
  History
}

@Component({
  selector: 'mib-demand-new-home',
  templateUrl: './demand-new-home.component.html',
  styleUrls: ['./demand-new-home.component.scss'],
  animations: [new AnimationService().generateAnimation(ANIMATION_CONFIG)],
  providers: [DestroyService]
})
export class DemandNewHomeComponent implements OnInit {
  requestLists: IQueryList[] = []
  drafts: any = []
  draftLists: any = []
  historys: any[] = []
  historyLists: any[] = []
  selectedHistoryLists: any[] = []
  selectedStatus: string = 'All'
  dialogType = DialogType
  tabType = TabType
  isDesktop: boolean = false
  loading$ = new BehaviorSubject<boolean>(false)

  skeletonWithoutUnderline: Properties = {
    height: '48px',
    width: '100%'
  }
  skeleton: Properties = {
    ...this.skeletonWithoutUnderline,
    borderBottom: '1px solid var(--wgr-tertiary)'
  }
  PAGINATOR_ITEMS_PER_PAGE = 7
  PAGINATOR_PAGE_TO_SHOW = 5

  currentPage$ = new BehaviorSubject<number>(1)

  selectedRequestsCount: number
  severalRequestsChecked: boolean = false
  demadDrawersData: any = []

  isEdits: boolean = false

  requestsAnimationStates: Record<number, boolean> = {}
  historyAnimationStates: Record<number, boolean> = {}
  currentIndex: number = 0
  headers = ['Тип запроса', 'Дата запроса', 'Статус запроса', 'Ответственный']

  dataMap = {
    0: 'Type',
    1: 'DateCreated',
    2: 'Status',
    3: {Manager: 'Name'}
  }

  constructor(
    private requestList: DataService,
    private demandDrawerService: DemandDrawerService,
    private demandSignatureDrawerService: DemandSignatureDrawerService,
    private demandSuretyDrawerService: DemandSuretyDrawerService,
    private demandEditingDrawerService: DemandEditingDrawerService,
    private demandLimitDrawerService: DemandLimitDrawerService,
    private demandDebtorDrawerService: DemandDebtorDrawerService,
    private demandVerificationDrawerService: DemandVerificationDrawerService,
    private demandFactoringDrawerService: DemandFactoringDrawerService,
    private demandAgentDrawerService: DemandAgentDrawerService,
    public breakpointService: BreakpointObserverService,
    private demandService: DemandService,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private destroy$: DestroyService
  ) {
  }

  ngOnInit(): void {
    this.getAllRequestesList()
    this.breakpointService
      .isDesktop()
      .pipe(takeUntil(this.destroy$))
      .subscribe(b => {
        this.isDesktop = b
      })
  }

  getRequestList(): void {
    this.requestList
      .getRequestList()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: val => {
          this.requestLists = val
        }
      })
  }

  getDraftList(): void {
    this.loading$.next(true)
    this.demandService
      .getDrafts()
      .pipe(
        switchMap((drafts: any[]) => {
          const draftRequests = drafts.map(draft =>
            this.demandService.getDemandDraftById(draft.ID).pipe(
              map(demand => {
                const Type = JSON.parse(demand.DemandData)
                const translatedType = this.getType(Type.Type)
                const fillProgress = '30%'

                return {
                  ID: draft.ID,
                  Type: translatedType.result,
                  TypeInt:translatedType.resultNum ,
                  Progress: `Заполнено на ${fillProgress}`,
                  info: Type
                }
              })
            )
          )
          // Ожидаем завершения всех запросов
          return forkJoin(draftRequests)
        }),
        tap(data => {
          this.drafts = data
          this.onDraftListChange(1)
        }),
        finalize(() => this.loading$.next(false)),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  getHistoryList(): void {
    this.loading$.next(true)

    this.demandService
      .getDemands()
      .pipe(
        tap(data => {
          this.historys = data
          this.selectedHistoryLists = this.historys
          this.onHistoryListChange(1)
        }),

        finalize(() => this.loading$.next(false)),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  getType(type: string): {result: string, resultNum: number} {
    let resultNum: number
    let result: string = ''
    switch (type) {
      case 'VerificationChannel':
        result = 'Верификация'
        resultNum = this.dialogType.Verify
        break
      case 'Guarantee':
        result = 'Поручительство'
        resultNum = this.dialogType.Surety
        break
      case 'Factoring':
        result = 'Факторинг'
        break
      case 'DigitalSignature':
        result = 'Запрос на ЭЦП'
        resultNum = this.dialogType.Signature
        break
      case 'ProfileChange':
        result = 'Редактирование Профиля'
        resultNum = this.dialogType.Profile
        break
      case 'Question':
        result = 'Свободная тема'
        resultNum = this.dialogType.Free
        break
      case 'Limit':
        result = 'Запрос на Лимит'
        resultNum = this.dialogType.Limit
        console.log('Limit', this.dialogType.Limit)
        break
      case 'NewDebtor':
        result = 'Новый дебитор'
        resultNum = this.dialogType.Debitor
        break
      case 'AgencyFactoring': //??
        result = 'Агентский Факторинг'
        resultNum = this.dialogType.Free
        break
      // default:
      //   result = 'Свободная тема'
      //   resultNum = this.dialogType.Free
      //   break
    }
    return {result, resultNum}
  }

  public getStatus(status: string): string {
    let result: string = ''
    switch (status) {
      case 'Created':
        result = 'Создан'
        break
      case 'Completed':
        result = 'Завершен'
        break
      case 'Processing':
        result = 'В процессе'
        break
      case 'Rejected':
        result = 'Отклонено'
        break
      case 'Draft':
        result = 'Черновик'
        break
      case 'Canceled':
        result = 'Отменен'
        break
    }
    return result
  }

  onPageChange<T>(page: number, sourceArray: T[] = []): T[] {
    this.currentPage$.next(page)

    const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE
    const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE

    return (sourceArray || []).slice(startIndex, endIndex)
  }

  onDraftListChange($event): void {
    this.draftLists = this.onPageChange($event, this.drafts)
  }

  onHistoryListChange($event) {
    this.historyLists = this.onPageChange($event, this.selectedHistoryLists)
  }

  openDrawers(id: number, reqId: number, type?: TabType, info?: any): void {
    let dialog$
    switch (id) {
      case this.dialogType.Signature:
        dialog$ = this.demandSignatureDrawerService
          .open({
            data: {
              isCreation: type === this.tabType.Request,
              isEdit: type === this.tabType.Draft,
              isView: type === this.tabType.History,
              id:
                type === this.tabType.History || type === this.tabType.Draft
                  ? reqId
                  : null
            }
          })
          .afterClosed()
        break
      case this.dialogType.Surety:
        dialog$ = this.demandSuretyDrawerService
          .open({
            data: {
              isCreation: type === this.tabType.Request,
              isEdit: type === this.tabType.Draft,
              isView: type === this.tabType.History,
              id:
                type === this.tabType.History || type === this.tabType.Draft
                  ? reqId
                  : null,
              info: type === this.tabType.Request ? null : info
            }
          })
          .afterClosed()
        break
      case this.dialogType.Profile:
        dialog$ = this.demandEditingDrawerService
          .open({
            data: {
              isCreation: type === this.tabType.Request,
              isEdit: type === this.tabType.Draft,
              isView: type === this.tabType.History,
              id:
                type === this.tabType.History || type === this.tabType.Draft
                  ? reqId
                  : null
            }
          })
          .afterClosed()
          .subscribe()
        break

      //Done
      case this.dialogType.Limit:
        dialog$ = this.demandLimitDrawerService
          .open(
            {
              data: {
                isCreation: type === this.tabType.Request,
                isEdit: type === this.tabType.Draft,
                isView: type === this.tabType.History,
                id:
                  type === this.tabType.History || type === this.tabType.Draft
                    ? reqId
                    : null,
                info: type === this.tabType.Request ? null : info
              }
            }
          )
          .afterClosed()
        break
      case this.dialogType.Debitor:
        dialog$ = this.demandDebtorDrawerService
          .open({
            data: {
              isCreation: type === this.tabType.Request,
              isEdit: type === this.tabType.Draft,
              isView: type === this.tabType.History,
              id:
                type === this.tabType.History || type === this.tabType.Draft
                  ? reqId
                  : null
            }
          })
          .afterClosed()
        break
      case this.dialogType.Verify:
        dialog$ = this.demandVerificationDrawerService
          .open({
            data: {
              isCreation: type === this.tabType.Request,
              isEdit: type === this.tabType.Draft,
              isView: type === this.tabType.History,
              id:
                type === this.tabType.History || type === this.tabType.Draft
                  ? reqId
                  : null,
              info: type === this.tabType.Request ? null : info
            }
          })
          .afterClosed()
        break

      //Done
      case this.dialogType.Free:
        dialog$ = this.demandDrawerService
          .open({
            data: {
              isCreation: type === this.tabType.Request,
              isEdit: type === this.tabType.Draft,
              isView: type === this.tabType.History,
              id:
                type === this.tabType.History || type === this.tabType.Draft
                  ? reqId
                  : null,
              info: type === this.tabType.Request ? null : info
            }
          })
          .afterClosed()
    }

    dialog$.subscribe()
  }

  sortDemandByStatus(status: string): void {
    if (status === 'All') {
      this.selectedHistoryLists = this.historys
    } else {
      this.selectedHistoryLists = this.historys.filter(
        item => item.Status === status
      )
    }

    this.onHistoryListChange(1)
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--
    }
  }

  next(): void {
    if (this.currentIndex < this.headers.length - 1) {
      this.currentIndex++
    }
  }

  getVisibleHeader() {
    return this.headers[this.currentIndex]
  }

  getVisibleCell(row: any) {
    const result = {}
    for (const [newKey, path] of Object.entries(this.dataMap)) {
      let value

      if (typeof path === 'string') {
        if (path === 'Type') {
          value = this.getType(row[path]).result
        } else if (path === 'Status') {
          value = this.getStatus(row[path])
        } else {
          value = row[path]
        }
      } else if (typeof path === 'object') {
        const [parentKey, childKey] = Object.entries(path)[0]
        value = row[parentKey] ? row[parentKey][childKey] : undefined
      }
      if (path === 'DateCreated' && value !== undefined) {
        value = this.datePipe.transform(value, 'dd.MM.yyyy')
      }
      result[newKey] = value
    }

    return result[this.currentIndex]
  }

  newDraftDrawer(id: number, type: number, typeTab?: TabType, data?: any) {
    console.log(type, id, typeTab, data)
    this.openDrawers(type, id, typeTab, data.info)
  }

  openDemandPageModal(d): void {
    const dialogConfig = {
      width: '100%',
      maxWidth: '600px',
      panelClass: 'custom-dialog-request',
      data: {d}
    }
    this.dialog.open(DemandPageHistoryModalComponent, dialogConfig)
  }

  private getAllRequestesList(): void {
    this.getRequestList()
    this.getDraftList()
    this.getHistoryList()
  }

  protected readonly TabType = TabType
}
