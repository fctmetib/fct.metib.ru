import {Component, OnInit, ViewChild} from '@angular/core'
import {Properties} from 'csstype'
import {BehaviorSubject, finalize, tap} from 'rxjs'
import {DeliveryService} from 'src/app/shared/services/share/delivery.service'
import {ToolsService} from 'src/app/shared/services/tools.service'
import {
  AdvancedDelivery,
  Delivery
} from 'src/app/shared/types/delivery/delivery'
import {TableSelectionEvent} from 'src/app/shared/ui-kit/table/interfaces/table.interface'
import {TableComponent} from 'src/app/shared/ui-kit/table/table.component'
import {ContractsDrawerService} from '../../modules/new-contracts-page-drawer/contracts-drawer.service'

@Component({
  selector: 'mib-contracts-page',
  templateUrl: './contracts-page.component.html',
  styleUrls: ['./contracts-page.component.scss']
})
export class ContractsPageComponent implements OnInit {
  public loading$ = new BehaviorSubject<boolean>(false)

  @ViewChild(TableComponent) table: TableComponent

  public skeletonWithoutUnderline: Properties = {
    height: '48px',
    width: '100%'
  }

  public skeleton: Properties = {
    ...this.skeletonWithoutUnderline,
    borderBottom: '1px solid var(--wgr-tertiary)'
  }

  public PAGINATOR_ITEMS_PER_PAGE = 7
  public PAGINATOR_PAGE_TO_SHOW = 5
  public currentPage$ = new BehaviorSubject<number>(1)

  public isClosedContracts = false
  public addStatistics = true

  public isCurrentContract = false
  public advancedContracts: AdvancedDelivery[] = []
  public advancedContractsVisible: AdvancedDelivery[] = []

  public currentContracts: Delivery[] = []
  public currentContractsVisible: Delivery[] = []

  public completedContracts: Delivery[] = []
  public completedContractsVisible: Delivery[] = []

  public requestsSelection: TableSelectionEvent = {
    selectedCount: 0,
    selectedIds: []
  }

  constructor(
    public toolsService: ToolsService,
    private deliveryService: DeliveryService,
    private contractsDrawerService: ContractsDrawerService
  ) {
  }

  ngOnInit(): void {
    this.getAllDeliveriesContracts()
  }

  getAllDeliveriesContracts() {
    this.loading$.next(true)
    this.deliveryService
      .getAllDeliveriesContracts(
        (this.isClosedContracts = true),
        this.addStatistics
      )
      .pipe(
        tap(data => {
          this.advancedContracts = data.map(c => ({
            ...c,
            AdvancedContract: Date.parse(c.DateTo) <= Date.now()
          }))
          this.completedContracts = this.advancedContracts.filter(
            c => c.AdvancedContract !== false
          )
          this.currentContracts = this.advancedContracts.filter(
            c => c.AdvancedContract === false
          )
          this.onAdvancedPageChange(1)
          this.onCurrentPageChange(1)
          this.onCompletedPageChange(1)
        }),
        finalize(() => this.loading$.next(false))
      )
      .subscribe()
  }

  selectionChange(event: TableSelectionEvent) {
    this.requestsSelection = event
  }

  onPageChange<T>(page: number, sourceArray: T[] = []) {
    this.currentPage$.next(page)

    const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE
    const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE

    return (sourceArray || []).slice(startIndex, endIndex)
  }

  onAdvancedPageChange($event) {
    this.advancedContractsVisible = this.onPageChange(
      $event,
      this.advancedContracts
    )
  }

  onCurrentPageChange($event) {
    this.currentContractsVisible = this.onPageChange(
      $event,
      this.currentContracts
    )
  }

  onCompletedPageChange($event) {
    this.completedContractsVisible = this.onPageChange(
      $event,
      this.completedContracts
    )
  }

  contractDrawer(deliveryID: number) {
    this.contractsDrawerService
      .open({
        data: {deliveryID}
      })
      .afterClosed()
      .pipe
      // filter(Boolean),
      // switchMap(async () => this.getClientDocumentsList())
      ()
      .subscribe()
  }
}
