import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {drawerConfig} from 'src/app/shared/ui-kit/drawer/drawer.tools'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {AgentPaymentsDrawerComponent} from './agent-payments-drawer.component'

@Injectable()
export class AgentPaymentsDrawerService {
	constructor(private dialog: MatDialog) {}

	open(
		data?: DrawerData<any>
	): MatDialogRef<AgentPaymentsDrawerComponent, number[]> {
		const config: DrawerData = {
			state: 'view'
		}
		return this.dialog.open(
			AgentPaymentsDrawerComponent,
			drawerConfig(data?.maxWidth, Object.assign(config, data))
		)
	}
}
