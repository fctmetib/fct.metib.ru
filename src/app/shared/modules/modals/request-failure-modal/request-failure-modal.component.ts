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

	openBrowserDrawer({d: draftId}) {
		if (!draftId) {
			console.error('Draft ID is missing')
			return
		}

		const draft = {
			data: {
				isCreation: true,
				DraftId: draftId
			}
		}

		this.dialogRef.close()
		this.demandDrawerService.open(draft)
	}
}
