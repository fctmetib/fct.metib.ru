import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {PinModalComponent} from './pin-modal.component'
import {modalConfig} from 'src/app/shared/ui-kit/modal/modal.tools'

@Injectable({
	providedIn: 'root'
})
export class PinModalService {
	constructor(private dialog: MatDialog) {}

	open(): MatDialogRef<PinModalComponent> {
		return this.dialog.open(PinModalComponent, modalConfig(1168))
	}
}
