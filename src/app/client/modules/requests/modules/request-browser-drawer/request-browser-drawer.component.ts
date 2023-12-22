import {Component, Inject} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {RequestRes} from '../../interfaces/request.interface'

@Component({
	selector: 'mib-request-browser-drawer',
	templateUrl: './request-browser-drawer.component.html',
	styleUrls: ['./request-browser-drawer.component.scss']
})
export class RequestBrowserDrawerComponent {
	public PAGINATOR_ITEMS_PER_PAGE = 5
	public PAGINATOR_PAGE_TO_SHOW = 5
	public currentPage: number = 1

	datas = 1000000
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: DrawerData<RequestRes>,
		private fb: FormBuilder,
		public dialogRef: MatDialogRef<RequestBrowserDrawerComponent>
	) {}
}
