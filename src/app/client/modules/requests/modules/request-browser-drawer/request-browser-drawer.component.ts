import {Component, Inject, OnInit} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {RequestBrowserDrawer} from './interfaces/request-browser.drawer'
import {RequestReq} from '../../interfaces/request.interface'
import {RequestsService} from '../../services/requests.service'
import {BehaviorSubject, of, switchMap, tap} from 'rxjs'
import {Properties} from 'csstype'
import {AdvancedRequests} from '../../pages/requests-page/interfaces/requests-page.interface'
import {Shipment} from '../shipment-drawer/interfaces/shipment.interface'

@Component({
	selector: 'mib-request-browser-drawer',
	templateUrl: './request-browser-drawer.component.html',
	styleUrls: ['./request-browser-drawer.component.scss']
})
export class RequestBrowserDrawerComponent implements OnInit {
	public loading$ = new BehaviorSubject<boolean>(false)

	public skeletonWithoutUnderline: Properties = {
		height: '48px',
		width: '100%'
	}

	public skeletonTitle: Properties = {
		height: '60px',
		width: '100%'
	}

	public skeletonTags: Properties = {
		height: '34px',
		width: '100%'
	}

	public skeletonCashPanel: Properties = {
		height: '170px',
		width: '100%'
	}

	public skeletonTabGroup: Properties = {
		height: '271px',
		width: '100%'
	}

	public skeleton: Properties = {
		...this.skeletonWithoutUnderline,
		borderBottom: '1px solid var(--wgr-tertiary)'
	}

	public PAGINATOR_ITEMS_PER_PAGE = 5
	public PAGINATOR_PAGE_TO_SHOW = 5
	public currentPage: number = 1

	public currentRequestId: number
	public requestData: RequestReq
	public request: Shipment[]
	public requests: AdvancedRequests[] = []
	public allRequests: AdvancedRequests[] = []
	freeLimit: number = 0

	public selectedRequestCount: number = 0
	public severalRequestsChecked: boolean = false

	public requestAnimationStates: Record<number, boolean> = {}

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: DrawerData<RequestBrowserDrawer>,
		private fb: FormBuilder,
		public dialogRef: MatDialogRef<RequestBrowserDrawerComponent>,
		public requestsService: RequestsService
	) {}

	ngOnInit(): void {
		this.getCurrentRequest()
		this.getAllRequest()
	}

	getCurrentRequest() {
		this.loading$.next(true)
		this.currentRequestId = this.data?.data?.requestId
		this.requestsService
			.getRequest(this.currentRequestId)
			.pipe(
				switchMap(response => {
					this.requestsService
						.getFreeLimit(response.Delivery.ID)
						.subscribe(limit => (this.freeLimit = limit))
					console.log('response :>> ', response)
					console.log('response.del.id :>> ', response.Delivery.ID)
					console.log('freeLimit :>> ', this.freeLimit)
					this.requestData = response
					return of(response)
				}),
				tap(data => {
					console.log('data :>> ', data)
					this.request = data.Shipments.map(x => ({...x, checked: false}))
					// Инициализация состояния анимации
					this.request.forEach(req => {
						this.requestAnimationStates[req.ID] = false
					})
					this.onPageChange2(this.currentPage)
				})
			)
			.subscribe({
				// unsubscribe
				complete: () => {
					this.loading$.next(false)
				}
			})
	}

	getAllRequest() {
		this.loading$.next(true)
		this.requestsService
			.getRequests()
			.pipe(
				tap(data => {
					this.requests = data.map(x => ({...x, checked: false}))
					// Инициализация состояния анимации
					this.requests.forEach(req => {
						this.requestAnimationStates[req.ID] = false
					})
					this.onPageChange(this.currentPage)
				})
			)
			.subscribe({complete: () => this.loading$.next(false)})
	}

	onPageChange(page: number) {
		this.currentPage = page

		const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE
		const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE

		this.selectedRequestCount = 0
		this.severalRequestsChecked = false

		// this.requestData.Shipments = this.request?.slice(startIndex, endIndex)
		this.allRequests = this.requests.slice(startIndex, endIndex)
	}

	onPageChange2(page: number) {
		this.currentPage = page

		const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE
		const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE

		this.selectedRequestCount = 0
		this.severalRequestsChecked = false

		this.requestData.Shipments = this.request?.slice(startIndex, endIndex)
		// this.allRequests = this.requests.slice(startIndex, endIndex)
	}
}
