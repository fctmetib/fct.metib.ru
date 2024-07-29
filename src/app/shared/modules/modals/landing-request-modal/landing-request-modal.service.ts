import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {LandingRequestModalComponent} from './landing-request-modal.component'
import {modalConfig} from 'src/app/shared/ui-kit/modal/modal.tools'

@Injectable({
	providedIn: 'root'
})
export class LandingRequestModalService {
	constructor(private dialog: MatDialog) {}

	open(): MatDialogRef<LandingRequestModalComponent> {
		return this.dialog.open(LandingRequestModalComponent, modalConfig(480))
	}
}
