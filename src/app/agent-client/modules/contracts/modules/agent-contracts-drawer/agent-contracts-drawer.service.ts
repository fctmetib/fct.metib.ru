import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {drawerConfig} from 'src/app/shared/ui-kit/drawer/drawer.tools'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {AgentContractsDrawerComponent} from './agent-contracts-drawer.component'

@Injectable({
	providedIn: 'root'
})
export class AgentContractsDrawerService {
	constructor(private dialog: MatDialog) {}

	open(
		data?: DrawerData<any>
	): MatDialogRef<AgentContractsDrawerComponent, number[]> {
		const config: DrawerData = {
			state: 'view'
		}
		return this.dialog.open(
			AgentContractsDrawerComponent,
			drawerConfig(data?.maxWidth, Object.assign(config, data))
		)
	}
}
