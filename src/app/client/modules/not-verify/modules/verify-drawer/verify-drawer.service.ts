import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {drawerConfig} from 'src/app/shared/ui-kit/drawer/drawer.tools'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {VerifyDrawerComponent} from './verify-drawer.component'

@Injectable()
export class VerifyDrawerService {
	constructor(private dialog: MatDialog) {}

	open(data?: DrawerData<any>): MatDialogRef<VerifyDrawerComponent> {
		const config: DrawerData = {
			state: 'view'
		}
		return this.dialog.open(
			VerifyDrawerComponent,
			drawerConfig(data?.maxWidth, Object.assign(config, data))
		)
	}
}
