import {Injectable} from '@angular/core'
import {RequestBrowserDrawerComponent} from './request-browser-drawer.component'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {drawerConfig} from 'src/app/shared/ui-kit/drawer/drawer.tools'
import {RequestBrowserDrawer} from './interfaces/request-browser.drawer';

@Injectable()
export class RequestBrowserDrawerService {
	constructor(private dialog: MatDialog) {}

	open(data?: DrawerData<RequestBrowserDrawer>): MatDialogRef<RequestBrowserDrawerComponent> {
		const config: DrawerData = {
			state: 'view'
		}
		return this.dialog.open(
			RequestBrowserDrawerComponent,
			drawerConfig(data?.maxWidth, Object.assign(config, data))
		)
	}
}
