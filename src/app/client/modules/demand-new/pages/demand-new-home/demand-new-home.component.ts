import {Component, OnInit} from '@angular/core'
import {
  BehaviorSubject,
  finalize,
  tap,
  takeUntil
} from 'rxjs'
import {
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
  DigitalSignature = 1,
  Guarantee, //поручительство
  ProfileChange,
  Limit,
  NewDebtor,
  VerificationChannel,
  Question,
}

export enum DemandsPrepareEnum {
  Question = 1, // Произвольный вопрос
  DigitalSignature = 2, // ЭЦП
  Limit = 4, // Увеличение лимита
  NewDebtor = 5, // Новый дебитор
  ProfileChange = 7, // Редактирование профиля
  VerificationChannel = 8, // Канал верификации
  Guarantee = 9, // Поручительство
}

export enum DemandsPrepareTranslationEnum {
  Question = 'Произвольный вопрос',
  DigitalSignature = 'ЭЦП',
  Factoring = 'Факторинг',
  Limit = 'Увеличение лимита',
  NewDebtor = 'Новый дебитор',
  ProfileChange = 'Редактирование профиля',
  VerificationChannel = 'Канал верификации',
  Guarantee = 'Поручительство',
  AgencyFactoring = 'Агентский факторинг',
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
  demandsPrepareEnum = DemandsPrepareEnum
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
  requestsAnimationStates: Record<number, boolean> = {}
  historyAnimationStates: Record<number, boolean> = {}
  currentIndex: number = 0
  headers = ['Тип запроса', 'Дата запроса', 'Статус запроса', 'Ответственный']
  TabType = TabType
  dataMap = {
    0: 'Type',
    1: 'DateCreated',
    2: 'Status',
    3: {Manager: 'Name'}
  }
  protected readonly String = String;

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
    this.getRequestList()
    this.breakpointService
      .isDesktop()
      .pipe(takeUntil(this.destroy$))
      .subscribe(b => {
        this.isDesktop = b
      })
  }

  get demandsPrepareTranslationEnum(): typeof DemandsPrepareTranslationEnum {
    return DemandsPrepareTranslationEnum;
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

          console.log('requestLists==', val);
        }
      })
  }

  getDraftList(): void {
    this.loading$.next(true)
    this.demandService
      .getDrafts()
      .pipe(
        // switchMap((drafts: any[]) => {
        //   const draftRequests = drafts.map(draft =>
        //     this.demandService.getDemandDraftById(draft.ID).pipe(
        //       map(demand => {
        //         const fillProgress = '30%'
        //         return {
        //           ID: draft.ID,
        //           Type: this.getType(demand.DemandData.Type).result,
        //           TypeInt: this.getType(demand.DemandData.Type).resultNum,
        //           Progress: `Заполнено на ${fillProgress}`
        //         }
        //       })
        //     )
        //   )
        //   // Ожидаем завершения всех запросов
        //   return forkJoin(draftRequests)
        // }),
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
        resultNum = this.dialogType.VerificationChannel
        break
      case 'Guarantee':
        result = 'Поручительство'
        resultNum = this.dialogType.Guarantee
        break
      case 'Factoring':
        result = 'Факторинг'
        break
      case 'DigitalSignature':
        result = 'Запрос на ЭЦП'
        resultNum = this.dialogType.DigitalSignature
        break
      case 'ProfileChange':
        result = 'Редактирование Профиля'
        resultNum = this.dialogType.ProfileChange
        break
      case 'Question':
        result = 'Свободная тема'
        resultNum = this.dialogType.Question
        break
      case 'Limit':
        result = 'Запрос на Лимит'
        resultNum = this.dialogType.Limit
        break
      case 'NewDebtor':
        result = 'Новый дебитор'
        resultNum = this.dialogType.NewDebtor
        break
      case 'AgencyFactoring': //??
        result = 'Агентский Факторинг'
        resultNum = this.dialogType.Question
        break
      default:
        result = 'Свободная тема'
        resultNum = this.dialogType.Question
        break
    }
    return {result, resultNum}
  }

  getStatus(status: string): string {
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

  onHistoryListChange($event): void {
    this.historyLists = this.onPageChange($event, this.selectedHistoryLists)
  }

  getTabId(tab: TabType) {
    switch (+tab) {
      case TabType.Request:
        this.getRequestList()
        break
      case TabType.Draft:
        this.getDraftList()
        break
      case TabType.History:
        this.getHistoryList()
        break
      default:
        break
    }
  }

  openDrawers(id: number, reqId: number, type?: TabType): void {
    const dialogService = this.getDialogService(id);
  
    if (!dialogService) {
      console.warn(`No dialog service found for id: ${id}`);
      return;
    }
  
    const dialogData = {
      prepareTypeId: this.demandsPrepareEnum[this.dialogType[id]],
      isCreation: type === this.tabType.Request,
      isEdit: type === this.tabType.Draft,
      isView: type === this.tabType.History,
      id:
        type === this.tabType.History || type === this.tabType.Draft ? reqId : null,
    };
  
    dialogService.open({ data: dialogData }).afterClosed()?.subscribe();
  }
  
  private getDialogService(id: number) {
    switch (id) {
      case this.dialogType.DigitalSignature:
        return this.demandSignatureDrawerService;
      case this.dialogType.Guarantee:
        return this.demandSuretyDrawerService;
      case this.dialogType.ProfileChange:
        return this.demandEditingDrawerService;
      case this.dialogType.Limit:
        return this.demandLimitDrawerService;
      case this.dialogType.NewDebtor:
        return this.demandDebtorDrawerService;
      case this.dialogType.VerificationChannel:
        return this.demandVerificationDrawerService;
      case this.dialogType.Question:
        return this.demandDrawerService;
      default:
        return null;
    }
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

  getVisibleHeader(): string {
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

  newDraftDrawer(id: number, type: number, typeTab?: TabType): void {
    this.openDrawers(type, id, typeTab)
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

}
