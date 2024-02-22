import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'

@Component({
	selector: 'mib-demand-debtor-drawer',
	templateUrl: './demand-debtor-drawer.component.html',
	styleUrls: ['./demand-debtor-drawer.component.scss']
})
export class DemandDebtorDrawerComponent {
	constructor(
		private toaster: ToasterService,
		public dialogRef: MatDialogRef<DemandDebtorDrawerComponent>
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
