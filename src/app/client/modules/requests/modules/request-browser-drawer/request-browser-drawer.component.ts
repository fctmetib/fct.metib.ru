import {Component, Inject, OnInit} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {RequestBrowserDrawer} from './interfaces/request-browser.drawer'
import {RequestReq} from '../../interfaces/request.interface'
import {RequestsService} from '../../services/requests.service'

@Component({
	selector: 'mib-request-browser-drawer',
	templateUrl: './request-browser-drawer.component.html',
	styleUrls: ['./request-browser-drawer.component.scss']
})
export class RequestBrowserDrawerComponent implements OnInit {
	public PAGINATOR_ITEMS_PER_PAGE = 5
	public PAGINATOR_PAGE_TO_SHOW = 5
	public currentPage: number = 1

	public currentRequestId: number
	public requestData: RequestReq

	datas = 1000000
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: DrawerData<RequestBrowserDrawer>,
		private fb: FormBuilder,
		public dialogRef: MatDialogRef<RequestBrowserDrawerComponent>,
		public requestsService: RequestsService
	) {}

	ngOnInit(): void {
		this.currentRequestId = this.data?.data?.requestId
		this.requestsService.getRequest(this.currentRequestId).subscribe({
			next: request => {
				this.requestData = request
				console.log('requestData :>> ', this.requestData)
			}
		})
	}
}
