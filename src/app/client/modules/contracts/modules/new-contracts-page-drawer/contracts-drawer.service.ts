import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {ContractsDrawerData} from './interfaces/contracts-drawer.data'
import {ContractsDrawerComponent} from './contracts-drawer.component'
import {drawerConfig} from 'src/app/shared/ui-kit/drawer/drawer.tools'

@Injectable()
export class ContractsDrawerService {
	constructor(private dialog: MatDialog) {}

	open(
		data?: DrawerData<ContractsDrawerData>
	): MatDialogRef<ContractsDrawerComponent, number[]> {
		const config: DrawerData = {
			state: 'view'
		}
		return this.dialog.open(
			ContractsDrawerComponent,
			drawerConfig(data?.maxWidth, Object.assign(config, data))
		)
	}
}
