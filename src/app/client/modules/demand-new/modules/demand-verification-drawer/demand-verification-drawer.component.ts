import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'

@Component({
	selector: 'mib-demand-verification-drawer',
	templateUrl: './demand-verification-drawer.component.html',
	styleUrls: ['./demand-verification-drawer.component.scss']
})
export class DemandVerificationDrawerComponent {
	constructor(
		private toaster: ToasterService,
		public dialogRef: MatDialogRef<DemandVerificationDrawerComponent>
	) {}

	public submitData() {
		this.toaster.show(
			'failure',
			'Функционал в разработке!',
			'',
			true,
			false,
			3000
		)
		// this.dialogRef.close()
	}
}
