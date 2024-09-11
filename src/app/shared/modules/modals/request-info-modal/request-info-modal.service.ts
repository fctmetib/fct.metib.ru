import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {modalConfig} from 'src/app/shared/ui-kit/modal/modal.tools'
import {RequestInfoModalComponent} from './request-info-modal.component'

@Injectable({
	providedIn: 'root'
})
export class RequestInfoModalService {
	constructor(private dialog: MatDialog) {}

	open(): MatDialogRef<RequestInfoModalComponent> {
		return this.dialog.open(RequestInfoModalComponent, modalConfig(1168))
	}
}
