import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {RequestFailureModalComponent} from './request-failure-modal.component'

@Injectable()
export class RequestFailureModalService {
	constructor(private dialog: MatDialog) {}

	open(d?: undefined): MatDialogRef<RequestFailureModalComponent> {
		const modalConfig = {
			width: '432px',
			data: {d}
		}
		return this.dialog.open(RequestFailureModalComponent, modalConfig)
	}
}
