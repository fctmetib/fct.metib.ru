import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'

@Component({
	selector: 'mib-agent-contracts-drawer',
	templateUrl: './agent-contracts-drawer.component.html',
	styleUrls: ['./agent-contracts-drawer.component.scss']
})
export class AgentContractsDrawerComponent {
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: DrawerData,
		public dialogRef: MatDialogRef<AgentContractsDrawerComponent>
	) {}
}
