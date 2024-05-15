import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'

@Component({
	selector: 'mib-verify-drawer',
	templateUrl: './verify-drawer.component.html',
	styleUrls: ['./verify-drawer.component.scss']
})
export class VerifyDrawerComponent {
	constructor(
		public dialogRef: MatDialogRef<VerifyDrawerComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DrawerData
	) {}
}
