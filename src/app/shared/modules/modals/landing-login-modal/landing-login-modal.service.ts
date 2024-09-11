import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {LandingLoginModalComponent} from './landing-login-modal.component'
import {modalConfig} from 'src/app/shared/ui-kit/modal/modal.tools'

@Injectable({
	providedIn: 'root'
})
export class LandingLoginModalService {
	constructor(private dialog: MatDialog) {}

	open(): MatDialogRef<LandingLoginModalComponent> {
		return this.dialog.open(LandingLoginModalComponent, modalConfig(400))
	}
}
