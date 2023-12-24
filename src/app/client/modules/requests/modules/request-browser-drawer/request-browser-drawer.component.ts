import {Component, Inject, OnInit} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {RequestBrowserDrawer} from './interfaces/request-browser.drawer'
import {RequestReq} from '../../interfaces/request.interface'
import {RequestsService} from '../../services/requests.service'
import {BehaviorSubject, of, switchMap} from 'rxjs'
import {Properties} from 'csstype'

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
	freeLimit: number = 0

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: DrawerData<RequestBrowserDrawer>,
		private fb: FormBuilder,
		public dialogRef: MatDialogRef<RequestBrowserDrawerComponent>,
		public requestsService: RequestsService
	) {}

	ngOnInit(): void {
		this.getCurrentRequest()
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
					return of(response)
				})
			)
			.subscribe({
				next: request => {
					this.requestData = request
				},
				complete: () => {
					this.loading$.next(false)
				}
			})
	}
}
