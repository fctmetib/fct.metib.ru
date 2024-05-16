import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'

@Component({
	selector: 'mib-verify-query-drawer',
	templateUrl: './verify-query-drawer.component.html',
	styleUrls: ['./verify-query-drawer.component.scss']
})
export class VerifyQueryDrawerComponent {
	constructor(
		public dialogRef: MatDialogRef<VerifyQueryDrawerComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DrawerData
	) {}
}
