import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {modalConfig} from 'src/app/shared/ui-kit/modal/modal.tools'
import {RequestFailureModalComponent} from './request-failure-modal.component'

@Injectable({
	providedIn: 'root'
})
export class RequestFailureModalService {
	constructor(private dialog: MatDialog) {}

	open(): MatDialogRef<RequestFailureModalComponent> {
		return this.dialog.open(RequestFailureModalComponent, modalConfig(1168))
	}
}
