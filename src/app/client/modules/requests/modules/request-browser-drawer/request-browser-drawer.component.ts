import {Component, Inject, OnInit} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {RequestBrowserDrawer} from './interfaces/request-browser.drawer'
import {Document, RequestReq} from '../../interfaces/request.interface'
import {RequestsService} from '../../services/requests.service'
import {BehaviorSubject, filter, finalize, switchMap, tap} from 'rxjs'
import {Properties} from 'csstype'
import {Shipment} from '../shipment-drawer/interfaces/shipment.interface'
import {ShipmentDrawerService} from '../shipment-drawer/services/shipment-drawer.service';

@Component({
  selector: 'mib-request-browser-drawer',
  templateUrl: './request-browser-drawer.component.html',
  styleUrls: ['./request-browser-drawer.component.scss']
})
export class RequestBrowserDrawerComponent implements OnInit {
  public loading$ = new BehaviorSubject<boolean>(false)

  public skeletonWithoutUnderline: Properties = {
    borderRadius: '8px',
    width: '100%'
  }

  public skeletonTitle: Properties = {
    ...this.skeletonWithoutUnderline,
    height: '60px',
  }

  public skeletonTags: Properties = {
    ...this.skeletonWithoutUnderline,
    height: '34px',
  }

  public skeletonCashPanel: Properties = {
    ...this.skeletonWithoutUnderline,
    height: '170px',
  }

  public skeletonTabGroup: Properties = {
    ...this.skeletonWithoutUnderline,
    height: '271px',
  }

  public skeleton: Properties = {
    ...this.skeletonWithoutUnderline,
    borderBottom: '1px solid var(--wgr-tertiary)'
  }

  public PAGINATOR_ITEMS_PER_PAGE = 5
  public PAGINATOR_PAGE_TO_SHOW = 5
  public currentPage$ = new BehaviorSubject<number>(1)

  public currentRequestId?: number
  public requestData?: RequestReq

  public concededSum: number = 0;
  public overdueSum: number = 0;

  public shipments: Shipment[] = []
  public shipmentsList: Shipment[] = []

  public documents: Document[] = []
  public documentsList: Document[] = []

  freeLimit: number = 0

  public selectedShipmentsCount: number = 0
  public severalShipmentsChecked: boolean = false

  public requestAnimationStates: Record<number, boolean> = {}

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DrawerData<RequestBrowserDrawer>,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RequestBrowserDrawerComponent>,
    public requestsService: RequestsService,
    private shipmentDrawerService: ShipmentDrawerService
  ) {
  }

  ngOnInit(): void {
    this.currentRequestId = this.data?.data?.requestId
    this.getCurrentRequest()
  }

  getCurrentRequest() {
    this.loading$.next(true)
    this.requestsService.getRequest(this.currentRequestId).pipe(
      tap(data => {
        this.requestData = data
        this.shipments = data.Shipments
        this.documents = data.Documents
        this.onShipmentsPageChange(1)
        this.onDocumentsPageChange(1)

        // this.concededSumm = data.Shipments.filter(x => x.).reduce(())

        // TODO: ПОПРОБОВАТЬ ИЗБАВИТЬСЯ ОТ ВСЕХ ИНИЦИАЛИЗАЦИЙ АНИМАЦИЙ ВНЕ ТАБЛИЦ
        // Инициализация состояния анимации
        this.shipments.forEach(req => {
          this.requestAnimationStates[req.ID] = false
        })
      }),
      switchMap(response => this.requestsService.getFreeLimit(response.Delivery.ID)),
      tap(limit => {
        this.freeLimit = limit
      }),
      finalize(() => {
        this.loading$.next(false)
      })
    ).subscribe()
  }

  // TODO: ВЫНЕСТИ ДОПОЛНИТЕЛЬНЫЙ ВИД КОМПОНЕНТА MIB-TABLE-FOOTER, СОДЕРЖАЩИЙ ПАГИНАТОР С ЛОГИКОЙ ЭТОГО МЕТОДА
  onPageChange<T>(page: number, sourceArray: T[]) {
    this.currentPage$.next(page)

    const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE
    const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE

    // TODO: ИЗБАВИТЬСЯ ОТ ЭТИХ ПЕРЕМЕННЫХ ВНЕ КОМПОНЕНТА ТАБЛИЦЫ
    this.selectedShipmentsCount = 0
    this.severalShipmentsChecked = false

    return sourceArray.slice(startIndex, endIndex)
  }

  onShipmentsPageChange($event) {
    this.shipmentsList = this.onPageChange($event, this.shipments)
  }

  onDocumentsPageChange($event: number) {
    this.documentsList = this.onPageChange($event, this.documents)
  }

  openShipment() {
    const drawer = this.shipmentDrawerService.open({maxWidth: 492})

    drawer.afterClosed().pipe(
      filter(Boolean),
      tap(shipment => {
        console.log(shipment)
        // this.shipments = [shipment, ...this.shipments]
      })
    ).subscribe()
  }
}
