// import { Component, Inject, OnInit } from '@angular/core'
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
// import { DrawerData } from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface'
// import { AdvancedRequests } from '../../components/requests-page/interfaces/requests-page.interface'
// import { ToolsService } from '../../../../../shared/services/tools.service'
// import { RequestDrawerService } from './request-drawer.service'
// import { BehaviorSubject, finalize, tap } from 'rxjs'
// import { RequestsResponse } from '../../../requests/types/requestResponse.interface'

// @Component({
// 	selector: 'mib-request-drawer',
// 	templateUrl: './request-drawer.component.html',
// 	styleUrls: ['./request-drawer.component.scss']
// })
// export class RequestDrawerComponent implements OnInit {
// 	public sending$ = new BehaviorSubject<boolean>(false)

// 	public PAGINATOR_ITEMS_PER_PAGE = 6
// 	public PAGINATOR_PAGE_TO_SHOW = 5

// 	public dutiesVisible: AdvancedRequests[] = []

// 	constructor(
// 		public dialogRef: MatDialogRef<RequestDrawerComponent>,
// 		public toolsService: ToolsService,
// 		private requestsService: RequestDrawerService,
// 		@Inject(MAT_DIALOG_DATA) public data: DrawerData<AdvancedRequests[]>
// 	) {}

// 	trackByFunction(index, data: RequestsResponse) {
// 		return data.ID
// 	}

// 	ngOnInit() {
// 		this.onPageChange(1)
// 	}

// 	onPageChange(page: number) {
// 		const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE
// 		const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE

// 		this.dutiesVisible = this.data.data.slice(startIndex, endIndex)
// 	}
// }

import { Component } from '@angular/core'

@Component({
	selector: 'mib-request-drawer',
	templateUrl: './request-drawer.component.html',
	styleUrls: ['./request-drawer.component.scss']
})
export class RequestDrawerComponent {}
