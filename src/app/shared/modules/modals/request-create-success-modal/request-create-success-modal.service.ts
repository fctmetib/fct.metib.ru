import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {RequestCreateSuccessModalComponent} from './request-create-success-modal.component'
import {modalConfig} from 'src/app/shared/ui-kit/modal/modal.tools'

@Injectable({
	providedIn: 'root'
})
export class RequestCreateSuccessModalService {
	constructor(private dialog: MatDialog) {}

	open(): MatDialogRef<RequestCreateSuccessModalComponent> {
		return this.dialog.open(
			RequestCreateSuccessModalComponent,
			modalConfig(1168)
		)
	}
}
