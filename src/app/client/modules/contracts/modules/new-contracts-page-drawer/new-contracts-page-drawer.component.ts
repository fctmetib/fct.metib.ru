import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {NewContractsPageDrawerInterface} from './interfaces/new-contracts-page-drawer.interface'
import {ToolsService} from 'src/app/shared/services/tools.service'

@Component({
	selector: 'mib-new-contracts-page-drawer',
	templateUrl: './new-contracts-page-drawer.component.html',
	styleUrls: ['./new-contracts-page-drawer.component.scss']
})
export class NewContractsPageDrawerComponent {
	constructor(
		@Inject(MAT_DIALOG_DATA)
		public data: DrawerData<NewContractsPageDrawerInterface>,
		public toolsService: ToolsService,
		public dialogRef: MatDialogRef<NewContractsPageDrawerComponent>
	) {}
}
