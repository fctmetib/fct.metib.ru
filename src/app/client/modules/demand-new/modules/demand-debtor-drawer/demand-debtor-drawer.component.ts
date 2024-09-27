import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'
import {DrawerData} from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface'

@Component({
	selector: 'mib-demand-debtor-drawer',
	templateUrl: './demand-debtor-drawer.component.html',
	styleUrls: ['./demand-debtor-drawer.component.scss']
})
export class DemandDebtorDrawerComponent {
	constructor(
		private toaster: ToasterService,
		public dialogRef: MatDialogRef<DemandDebtorDrawerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DrawerData
  ) {
    console.log(data.data.id)
  }

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
