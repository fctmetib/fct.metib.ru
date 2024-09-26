import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {DemandSuretyDrawerComponent} from './demand-surety-drawer.component'
import {drawerConfig} from 'src/app/shared/ui-kit/drawer/drawer.tools'

@Injectable()
export class DemandSuretyDrawerService {
	constructor(private dialog: MatDialog) {}

	open(
		data?: DrawerData<any>
	): MatDialogRef<DemandSuretyDrawerComponent, number[]> {
		const config: DrawerData = {}
		return this.dialog.open(
			DemandSuretyDrawerComponent,
			drawerConfig(data?.maxWidth, Object.assign(config, data))
		)
	}
}
