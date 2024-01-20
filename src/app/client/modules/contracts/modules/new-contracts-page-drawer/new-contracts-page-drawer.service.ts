import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {NewContractsPageDrawerInterface} from './interfaces/new-contracts-page-drawer.interface'
import {NewContractsPageDrawerComponent} from './new-contracts-page-drawer.component'
import {drawerConfig} from 'src/app/shared/ui-kit/drawer/drawer.tools'

@Injectable({
	providedIn: 'root'
})
export class NewContractsPageDrawerService {
	constructor(private dialog: MatDialog) {}

	open(
		data?: DrawerData<NewContractsPageDrawerInterface>
	): MatDialogRef<NewContractsPageDrawerComponent, number[]> {
		const config: DrawerData = {
			state: 'view'
		}
		return this.dialog.open(
			NewContractsPageDrawerComponent,
			drawerConfig(data?.maxWidth, Object.assign(config, data))
		)
	}
}
