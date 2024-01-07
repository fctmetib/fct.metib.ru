import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {modalConfig} from 'src/app/shared/ui-kit/modal/modal.tools'
import {NewShipmentModalComponent} from './new-shipment-modal.component'

@Injectable({
	providedIn: 'root'
})
export class NewShipmentModalService {
	constructor(private dialog: MatDialog) {}

	open(): MatDialogRef<NewShipmentModalComponent> {
		return this.dialog.open(NewShipmentModalComponent, modalConfig(1168))
	}
}
