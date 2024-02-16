import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'

@Component({
	selector: 'mib-demand-debtor-drawer',
	templateUrl: './demand-debtor-drawer.component.html',
	styleUrls: ['./demand-debtor-drawer.component.scss']
})
export class DemandDebtorDrawerComponent {
	constructor(public dialogRef: MatDialogRef<DemandDebtorDrawerComponent>) {}
}
