import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {drawerConfig} from 'src/app/shared/ui-kit/drawer/drawer.tools'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {CabinetEditNewsDrawerComponent} from './cabinet-edit-news-drawer.component'

@Injectable()
export class CabinetEditNewsDrawerService {
	constructor(private dialog: MatDialog) {}

	open<T>(
		data?: DrawerData<any>
	): MatDialogRef<CabinetEditNewsDrawerComponent, number[]> {
		const config: DrawerData = {
			state: 'view'
		}
		return this.dialog.open(
			CabinetEditNewsDrawerComponent,
			drawerConfig(data?.maxWidth, Object.assign(config, data))
		)
	}
}
