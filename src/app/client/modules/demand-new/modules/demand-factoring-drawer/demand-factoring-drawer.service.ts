import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {drawerConfig} from 'src/app/shared/ui-kit/drawer/drawer.tools'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {DemandFactoringDrawerComponent} from './demand-factoring-drawer.component'

@Injectable({
  providedIn: 'root'
})
export class DemandFactoringDrawerService {
	constructor(private dialog: MatDialog) {}

	open(
		data?: DrawerData<any>
	): MatDialogRef<DemandFactoringDrawerComponent, number[]> {
		const config: DrawerData = {
			state: 'view'
		}
		return this.dialog.open(
			DemandFactoringDrawerComponent,
			drawerConfig(data?.maxWidth, Object.assign(config, data))
		)
	}
}
