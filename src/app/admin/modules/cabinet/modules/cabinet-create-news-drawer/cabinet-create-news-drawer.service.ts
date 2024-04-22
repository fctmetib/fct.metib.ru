import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {CabinetCreateNewsDrawerComponent} from './cabinet-create-news-drawer.component'
import {drawerConfig} from 'src/app/shared/ui-kit/drawer/drawer.tools'

@Injectable()
export class CabinetCreateNewsDrawerService {
	constructor(private dialog: MatDialog) {}

	open<T>(
		data?: DrawerData<any>
	): MatDialogRef<CabinetCreateNewsDrawerComponent> {
		const config: DrawerData = {
			state: 'view'
		}
		return this.dialog.open(
			CabinetCreateNewsDrawerComponent,
			drawerConfig(data?.maxWidth, Object.assign(config, data))
		)
	}
}
