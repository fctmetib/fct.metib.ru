import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'

@Component({
	selector: 'mib-request-drawer',
	templateUrl: './request-drawer.component.html',
	styleUrls: ['./request-drawer.component.scss']
})
export class RequestDrawerComponent {
	constructor(
		public dialogRef: MatDialogRef<RequestDrawerComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DrawerData
	) {}
}
