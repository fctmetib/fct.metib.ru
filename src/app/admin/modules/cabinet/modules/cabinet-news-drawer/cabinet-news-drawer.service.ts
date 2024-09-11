import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {drawerConfig} from 'src/app/shared/ui-kit/drawer/drawer.tools'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {CabinetNewsDrawerComponent} from './cabinet-news-drawer.component'

@Injectable()
export class CabinetNewsDrawerService {
	constructor(private dialog: MatDialog) {}

	open<T>(
		data?: DrawerData<any>
	): MatDialogRef<CabinetNewsDrawerComponent, number[]> {
		const config: DrawerData = {
			state: 'view'
		}
		return this.dialog.open(
			CabinetNewsDrawerComponent,
			drawerConfig(data?.maxWidth, Object.assign(config, data))
		)
	}
}
