import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {AgentDocumentViewDrawerComponent} from './agent-document-view-drawer.component'
import {drawerConfig} from 'src/app/shared/ui-kit/drawer/drawer.tools'

@Injectable()
export class AgentDocumentViewDrawerService {
	constructor(private dialog: MatDialog) {}

	open(
		data?: DrawerData<any>
	): MatDialogRef<AgentDocumentViewDrawerComponent, number[]> {
		const config: DrawerData = {
			state: 'view'
		}
		return this.dialog.open(
			AgentDocumentViewDrawerComponent,
			drawerConfig(data?.maxWidth, Object.assign(config, data))
		)
	}
}
