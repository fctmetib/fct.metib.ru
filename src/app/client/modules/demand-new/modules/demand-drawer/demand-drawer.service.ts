import { Injectable } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { DrawerData } from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import { DemandDrawerComponent } from './demand-drawer.component'
import { drawerConfig } from 'src/app/shared/ui-kit/drawer/drawer.tools'

@Injectable({
	providedIn: 'root'
})
export class DemandDrawerService {
	constructor(private dialog: MatDialog) {}

	open<T>(data?: DrawerData<T>): MatDialogRef<DemandDrawerComponent, number[]> {
		const config: DrawerData = {
			state: 'view'
		}
		return this.dialog.open(
			DemandDrawerComponent,
			drawerConfig(data?.maxWidth, Object.assign(config, data))
		)
	}
}
