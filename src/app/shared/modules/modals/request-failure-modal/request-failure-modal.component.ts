import {Component, EventEmitter, Inject, Output} from '@angular/core'
import {
	MAT_DIALOG_DATA,
	MatDialog,
	MatDialogRef
} from '@angular/material/dialog'
import {DemandDrawerService} from 'src/app/client/modules/demand-new/modules/demand-drawer/demand-drawer.service'

@Component({
	selector: 'mib-request-failure-modal',
	templateUrl: './request-failure-modal.component.html',
	styleUrls: ['./request-failure-modal.component.scss']
})
export class RequestFailureModalComponent {
	@Output() onDraft = new EventEmitter()
	@Output() onClose = new EventEmitter()

	constructor(
		public dialogRef: MatDialogRef<RequestFailureModalComponent>,
		private demandDrawerService: DemandDrawerService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	openBrowserDrawer(data) {
		const draft = data.d.data || null
		this.dialogRef.close()
		console.log('draft from failure :>> ', draft)
		this.demandDrawerService.open(draft)
	}
}
