import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'

@Component({
	selector: 'mib-demand-verification-drawer',
	templateUrl: './demand-verification-drawer.component.html',
	styleUrls: ['./demand-verification-drawer.component.scss']
})
export class DemandVerificationDrawerComponent {
	constructor(
		public dialogRef: MatDialogRef<DemandVerificationDrawerComponent>
	) {}
}
