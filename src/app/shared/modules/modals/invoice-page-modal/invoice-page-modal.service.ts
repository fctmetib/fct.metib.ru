import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {InvoicePageModalComponent} from './invoice-page-modal.component'
import {modalConfig} from 'src/app/shared/ui-kit/modal/modal.tools'

@Injectable({
	providedIn: 'root'
})
export class InvoicePageModalService {
	constructor(private dialog: MatDialog) {}

	open(): MatDialogRef<InvoicePageModalComponent> {
		return this.dialog.open(InvoicePageModalComponent, modalConfig(1168))
	}
}
