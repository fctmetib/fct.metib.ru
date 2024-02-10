import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'

@Component({
	selector: 'mib-demand-signature-drawer',
	templateUrl: './demand-signature-drawer.component.html',
	styleUrls: ['./demand-signature-drawer.component.scss']
})
export class DemandSignatureDrawerComponent {
	constructor(
		public dialogRef: MatDialogRef<DemandSignatureDrawerComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DrawerData
	) {}
}
