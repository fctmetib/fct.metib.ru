import { Component, inject, OnInit } from '@angular/core';
import {RequestDrawerService} from '../../modules/verify-request-drawer/request-drawer.service'
import {DrawerStateEnum} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {
  DemandFactoringDrawerService
} from '../../../demand-new/modules/demand-factoring-drawer/demand-factoring-drawer.service';
import { DemandAgentDrawerService } from '../../../demand-new/modules/demand-agent-drawer/demand-agent-drawer.service';
import { SystemUserService } from '../../../../../shared/services/system-user.service';
import {
  DemandSignatureDrawerService
} from '../../../demand-new/modules/demand-signature-drawer/demand-signature-drawer.service';
import {
  DemandsPrepareEnum,
  DialogType,
  TabType
} from '../../../demand-new/pages/demand-new-home/demand-new-home.component';
import { BehaviorSubject, finalize, takeUntil, tap } from 'rxjs';
import { DemandService } from '../../../demand-new/services/demand.service';
import { IQueryList } from '../../../demand-new/pages/mock-data-service/data.models';
import { Properties } from 'csstype';
import { DestroyService } from '../../../../../shared/services/common/destroy.service';
import { DataService } from '../../../demand-new/pages/mock-data-service/data.service';
import { BreakpointObserverService } from '../../../../../shared/services/common/breakpoint-observer.service';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'mib-not-verify',
	templateUrl: './not-verify.component.html',
	styleUrls: ['./not-verify.component.scss']
})
export class NotVerifyComponent {
  //
  // private readonly demandSignatureDrawerService = inject(DemandSignatureDrawerService)
  // private readonly demandFactoringDrawerService = inject(DemandFactoringDrawerService)
  // private readonly demandAgentDrawerService = inject(DemandAgentDrawerService)
  // private readonly requestDrawerService = inject(RequestDrawerService)
  // private readonly systemUserService = inject(SystemUserService)
  // private readonly demandService = inject(DemandService)
  // private readonly breakpointService = inject(BreakpointObserverService)
  // private readonly requestList = inject(DataService)
  // private readonly destroy$: DestroyService
  // private readonly datePipe = inject(DatePipe)
  // protected readonly String = String;
  //
  // systemUser = this.systemUserService.getCookieUser()
  // isNotDebtor = !this.systemUser?.Roles?.includes('Debtor')
  // isNotCustomer = !this.systemUser?.Roles?.includes('Customer')
  //
  // dialogType = DialogType
  // currentIndex: number = 0
  // loading$ = new BehaviorSubject<boolean>(false)
  // headers = ['Тип запроса', 'Дата запроса', 'Статус запроса', 'Ответственный']
  // tabType = TabType
  // requestLists: IQueryList[] = []
  // drafts: any = []
  // draftLists: any = []
  // histories: any[] = []
  // historiesLists: any[] = []
  // selectedHistoryLists: any[] = []
  // dataMap = {
  //   0: 'Type',
  //   1: 'DateCreated',
  //   2: 'Status',
  //   3: {Manager: 'Name'}
  // }
  // skeletonWithoutUnderline: Properties = {
  //   height: '48px',
  //   width: '100%'
  // }
  // skeleton: Properties = {
  //   ...this.skeletonWithoutUnderline,
  //   borderBottom: '1px solid var(--wgr-tertiary)'
  // }
  // PAGINATOR_ITEMS_PER_PAGE = 7
  // PAGINATOR_PAGE_TO_SHOW = 5
  // currentPage$ = new BehaviorSubject<number>(1)
  // isDesktop: boolean = false
  //
  // ngOnInit(): void {
  //   this.getRequestList()
  //   this.breakpointService
  //     .isDesktop()
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe(b => {
  //       this.isDesktop = b
  //     })
  // }
  //
  // openAgencyDrawer() {
  //   this.demandAgentDrawerService
  //     .open({state: DrawerStateEnum.CREATE})
  //     .afterClosed()
  //     .subscribe()
  // }
  //
  // openFactoringDrawer() {
  //   this.demandFactoringDrawerService
  //     .open({state: DrawerStateEnum.CREATE})
  //     .afterClosed()
  //     .subscribe()
  // }
  //
  // opeSignatureDrawer() {
  //
  //   const dialogData = {
  //     prepareTypeId: DemandsPrepareEnum.Eds,
  //     isCreation: true,
  //     isEdit: false,
  //     isView: false,
  //     id: null
  //   };
  //
  //   this.demandSignatureDrawerService
	// 		.open({data: dialogData})
	// 		.afterClosed()
	// 		.subscribe()
	// }
  //
  // openRequestDrawer() {
  //   this.requestDrawerService
  //     .open({state: DrawerStateEnum.CREATE})
  //     .afterClosed()
  //     .subscribe()
  // }
  //
  // getRequestList(): void {
  //   this.requestList
  //     .getRequestList()
  //     .pipe(
  //       takeUntil(this.destroy$)
  //     )
  //     .subscribe({
  //       next: val => {
  //         this.requestLists = val
  //
  //         console.log('requestLists==', val);
  //       }
  //     })
  // }
  //
  // getDraftList(): void {
  //   this.loading$.next(true)
  //   this.demandService
  //     .getDrafts()
  //     .pipe(
  //       // switchMap((drafts: any[]) => {
  //       //   const draftRequests = drafts.map(draft =>
  //       //     this.demandService.getDemandDraftById(draft.ID).pipe(
  //       //       map(demand => {
  //       //         const fillProgress = '30%'
  //       //         return {
  //       //           ID: draft.ID,
  //       //           Type: this.getType(demand.DemandData.Type).result,
  //       //           TypeInt: this.getType(demand.DemandData.Type).resultNum,
  //       //           Progress: `Заполнено на ${fillProgress}`
  //       //         }
  //       //       })
  //       //     )
  //       //   )
  //       //   // Ожидаем завершения всех запросов
  //       //   return forkJoin(draftRequests)
  //       // }),
  //       tap(data => {
  //         this.drafts = data
  //         this.onDraftListChange(1)
  //       }),
  //       finalize(() => this.loading$.next(false)),
  //       takeUntil(this.destroy$)
  //     )
  //     .subscribe()
  // }
  //
  // getHistoryList(): void {
  //   this.loading$.next(true)
  //
  //   this.demandService
  //     .getDemands()
  //     .pipe(
  //       tap(data => {
  //         this.histories = data
  //         this.selectedHistoryLists = this.histories
  //         this.onHistoryListChange(1)
  //       }),
  //
  //       finalize(() => this.loading$.next(false)),
  //       takeUntil(this.destroy$)
  //     )
  //     .subscribe()
  // }
  //
  // getTabId(tab: TabType) {
  //   switch (+tab) {
  //     case TabType.Request:
  //       this.getRequestList()
  //       break
  //     case TabType.Draft:
  //       this.getDraftList()
  //       break
  //     case TabType.History:
  //       this.getHistoryList()
  //       break
  //     default:
  //       break
  //   }
  // }
  //
  // getStatus(status: string): string {
  //   let result: string = ''
  //   switch (status) {
  //     case 'Created':
  //       result = 'Создан'
  //       break
  //     case 'Completed':
  //       result = 'Завершен'
  //       break
  //     case 'Processing':
  //       result = 'В процессе'
  //       break
  //     case 'Rejected':
  //       result = 'Отклонено'
  //       break
  //     case 'Canceled':
  //       result = 'Отменен'
  //       break
  //   }
  //   return result
  // }
  //
  // onPageChange<T>(page: number, sourceArray: T[] = []): T[] {
  //   this.currentPage$.next(page)
  //
  //   const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE
  //   const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE
  //
  //   return (sourceArray || []).slice(startIndex, endIndex)
  // }
  //
  // onDraftListChange($event): void {
  //   this.draftLists = this.onPageChange($event, this.drafts)
  // }
  //
  // onHistoryListChange($event): void {
  //   this.historiesLists = this.onPageChange($event, this.selectedHistoryLists)
  // }
  //
  // getVisibleHeader(): string {
  //   return this.headers[this.currentIndex]
  // }
  //
  // getVisibleCell(row: any) {
  //   const result = {}
  //   for (const [newKey, path] of Object.entries(this.dataMap)) {
  //     let value
  //
  //     if (typeof path === 'string') {
  //       if (path === 'Type') {
  //         value = this.getType(row[path]).result
  //       } else if (path === 'Status') {
  //         value = this.getStatus(row[path])
  //       } else {
  //         value = row[path]
  //       }
  //     } else if (typeof path === 'object') {
  //       const [parentKey, childKey] = Object.entries(path)[0]
  //       value = row[parentKey] ? row[parentKey][childKey] : undefined
  //     }
  //     if (path === 'DateCreated' && value !== undefined) {
  //       value = this.datePipe.transform(value, 'dd.MM.yyyy')
  //     }
  //     result[newKey] = value
  //   }
  //
  //   return result[this.currentIndex]
  // }
  //
  // getType(type: string): {result: string, resultNum: number} {
  //   let resultNum: number
  //   let result: string = ''
  //   switch (type) {
  //     case 'VerificationChannel':
  //       result = 'Верификация'
  //       resultNum = this.dialogType.VerificationChannel
  //       break
  //     case 'Guarantee':
  //       result = 'Поручительство'
  //       resultNum = this.dialogType.Guarantee
  //       break
  //     case 'Factoring':
  //       result = 'Факторинг'
  //       break
  //     case 'DigitalSignature':
  //       result = 'Запрос на ЭЦП'
  //       resultNum = this.dialogType.DigitalSignature
  //       break
  //     case 'ProfileChange':
  //       result = 'Редактирование Профиля'
  //       resultNum = this.dialogType.ProfileChange
  //       break
  //     case 'Question':
  //       result = 'Свободная тема'
  //       resultNum = this.dialogType.Question
  //       break
  //     case 'Limit':
  //       result = 'Запрос на Лимит'
  //       resultNum = this.dialogType.Limit
  //       break
  //     case 'NewDebtor':
  //       result = 'Новый дебитор'
  //       resultNum = this.dialogType.NewDebtor
  //       break
  //     case 'AgencyFactoring': //??
  //       result = 'Агентский Факторинг'
  //       resultNum = this.dialogType.Question
  //       break
  //     default:
  //       result = 'Свободная тема'
  //       resultNum = this.dialogType.Question
  //       break
  //   }
  //   return {result, resultNum}
  // }
  //
  // newDraftDrawer(id: number, type: number, typeTab?: TabType): void {
  //   this.openDrawers(type, id, typeTab)
  // }
  //
  //
  // openDrawers(id: number, reqId: number, type?: TabType): void {
  //   const dialogService = this.getDialogService(id);
  //
  //   if (!dialogService) {
  //     console.warn(`No dialog service found for id: ${id}`);
  //     return;
  //   }
  //
  //   const dialogData = {
  //     prepareTypeId: this.demandsPrepareEnum[this.dialogType[id]],
  //     isCreation: type === this.tabType.Request,
  //     isEdit: type === this.tabType.Draft,
  //     isView: type === this.tabType.History,
  //     id:
  //       type === this.tabType.History || type === this.tabType.Draft ? reqId : null,
  //   };
  //
  //   dialogService.open({ data: dialogData }).afterClosed()?.subscribe();
  // }
  //
  // private getDialogService(id: number) {
  //   switch (id) {
  //     case this.dialogType.DigitalSignature:
  //       return this.demandSignatureDrawerService;
  //     case this.dialogType.Guarantee:
  //       return this.demandSuretyDrawerService;
  //     case this.dialogType.ProfileChange:
  //       return this.demandEditingDrawerService;
  //     case this.dialogType.Limit:
  //       return this.demandLimitDrawerService;
  //     case this.dialogType.NewDebtor:
  //       return this.demandDebtorDrawerService;
  //     case this.dialogType.VerificationChannel:
  //       return this.demandVerificationDrawerService;
  //     case this.dialogType.Question:
  //       return this.demandDrawerService;
  //     default:
  //       return null;
  //   }
  // }


}
