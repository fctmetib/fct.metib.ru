import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {modalConfig} from 'src/app/shared/ui-kit/modal/modal.tools'
import {PaymentsPageModalComponent} from './payments-page-modal.component'

@Injectable({
	providedIn: 'root'
})
export class PaymentsPageModalService {
	constructor(private dialog: MatDialog) {}

	open(): MatDialogRef<PaymentsPageModalComponent> {
		return this.dialog.open(PaymentsPageModalComponent, modalConfig(1168))
	}
}
