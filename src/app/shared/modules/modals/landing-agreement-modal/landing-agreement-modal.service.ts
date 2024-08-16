import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {LandingAgreementModalComponent} from './landing-agreement-modal.component'
import {modalConfig} from 'src/app/shared/ui-kit/modal/modal.tools'

@Injectable({
	providedIn: 'root'
})
export class LandingAgreementModalService {
	constructor(private dialog: MatDialog) {}

	open(): MatDialogRef<LandingAgreementModalComponent> {
		return this.dialog.open(LandingAgreementModalComponent, modalConfig(600))
	}
}
