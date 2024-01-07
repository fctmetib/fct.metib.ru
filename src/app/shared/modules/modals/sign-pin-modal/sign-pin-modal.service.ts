import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {modalConfig} from 'src/app/shared/ui-kit/modal/modal.tools'
import {SignPinModalComponent} from './sign-pin-modal.component';

@Injectable({
	providedIn: 'root'
})
export class SignPinModalService {
	constructor(
    private dialog: MatDialog
  ) {}

	open(requestIds: number[]): MatDialogRef<SignPinModalComponent> {
		return this.dialog.open(SignPinModalComponent, modalConfig(432, requestIds))
	}
}
