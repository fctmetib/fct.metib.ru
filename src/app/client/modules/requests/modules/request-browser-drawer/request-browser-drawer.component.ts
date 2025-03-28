import {Component, Inject, OnInit} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {RequestBrowserDrawer} from './interfaces/request-browser.drawer'
import {DocumentRes, RequestState} from '../../interfaces/request.interface'
import {RequestsService} from '../../services/requests.service'
import {BehaviorSubject, filter, finalize, switchMap, tap} from 'rxjs'
import {Properties} from 'csstype'
import {Shipment} from '../shipment-drawer/interfaces/shipment.interface'
import {RequestCorrectionModalService} from '../../../../../shared/modules/modals/request-correction-modal/request-correction-modal.service'
import {RequestBrowserDrawerService} from './request-browser-drawer.service'
import {Drawer} from '../../../../../shared/ui-kit/drawer/drawer.class'
import {RequestDrawerService} from '../request-drawer/request-drawer.service'
import {DocumentViewDrawerService} from '../../../documents/modules/document-view-drawer/document-view-drawer.service';

@Component({
	selector: 'mib-request-browser-drawer',
	templateUrl: './request-browser-drawer.component.html',
	styleUrls: ['./request-browser-drawer.component.scss']
})
export class RequestBrowserDrawerComponent extends Drawer implements OnInit {
	public loading$ = new BehaviorSubject<boolean>(false)

	public skeletonWithoutUnderline: Properties = {
		borderRadius: '8px',
		width: '100%'
	}

	public skeletonTitle: Properties = {
		...this.skeletonWithoutUnderline,
		height: '60px'
	}

	public skeletonTags: Properties = {
		...this.skeletonWithoutUnderline,
		height: '34px'
	}

	public skeletonCashPanel: Properties = {
		...this.skeletonWithoutUnderline,
		height: '170px'
	}

	public skeletonTabGroup: Properties = {
		...this.skeletonWithoutUnderline,
		height: '271px'
	}

	public skeleton: Properties = {
		...this.skeletonWithoutUnderline,
		borderBottom: '1px solid var(--wgr-tertiary)'
	}

	public PAGINATOR_ITEMS_PER_PAGE = 5
	public PAGINATOR_PAGE_TO_SHOW = 5
	public currentPage$ = new BehaviorSubject<number>(1)

	public concededSum: number = 0
	public overdueSum: number = 0

	public shipments: Shipment[] = []
	public shipmentsDisplay: Shipment[] = []

	public documents: DocumentRes[] = []
	public documentsDisplay: DocumentRes[] = []

	public freeLimit: number = 0

	public requestStates: RequestState[] = []

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: DrawerData<RequestBrowserDrawer>,
		private fb: FormBuilder,
		public dialogRef: MatDialogRef<RequestBrowserDrawerComponent>,
		public requestsService: RequestsService,
		private requestBrowserDrawerService: RequestBrowserDrawerService,
    private documentViewDrawerService: DocumentViewDrawerService,
		private requestDrawerService: RequestDrawerService,
		private correctionModalService: RequestCorrectionModalService
	) {
		super(data)
	}

	ngOnInit(): void {
		this.getCurrentRequest()
	}

	get requestId() {
		return this.data.data.requestId
	}

	get request() {
		return this.requestBrowserDrawerService.request
	}

	getCurrentRequest() {
		this.loading$.next(true)
		this.requestsService
			.getRequest(this.requestId)
			.pipe(
				tap(data => {
					this.requestBrowserDrawerService.request$.next(data)
					this.shipments = data.Shipments
					this.documents = data.Documents
					this.onShipmentsPageChange(1)
					this.onDocumentsPageChange(1)

					// this.concededSumm = data.Shipments.filter(x => x.).reduce(())
				}),
				switchMap(response =>
					this.requestsService
						.getFreeLimit(response.Delivery.ID)
						.pipe(tap(limit => (this.freeLimit = limit)))
				),
				switchMap(() => this.getCurrentStates()),
				finalize(() => {
					this.loading$.next(false)
				})
			)
			.subscribe()
	}

	onPageChange<T>(page: number, sourceArray: T[] = []) {
		this.currentPage$.next(page)

		const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE
		const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE

		return (sourceArray || []).slice(startIndex, endIndex)
	}

	onShipmentsPageChange($event) {
		this.shipmentsDisplay = this.onPageChange($event, this.shipments)
	}

	onDocumentsPageChange($event: number) {
		this.documentsDisplay = this.onPageChange($event, this.documents)
	}

	getCurrentStates() {
		return this.requestsService.getStates(this.requestId).pipe(
			tap(states => {
				this.requestStates = states
				console.log('this.comments :>> ', this.requestStates)
			})
		)
	}

	openCorrectionModal() {
		this.correctionModalService
			.open(this.shipmentsDisplay)
			.afterClosed()
			.pipe(
				filter(Boolean),
				tap(boolean => {
					this.dialogRef.close(boolean)
				})
			)
			.subscribe()
	}

	onEdit() {
		this.requestDrawerService.open({
			state: 'edit',
			data: this.request
		})
	}

  openDocumentView(documentID: number) {
    this.documentViewDrawerService.open({
      data: {
        documentID
      }
    })
  }
}
