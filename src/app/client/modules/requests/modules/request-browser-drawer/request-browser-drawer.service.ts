import {Injectable} from '@angular/core'
import {RequestBrowserDrawerComponent} from './request-browser-drawer.component'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {drawerConfig} from 'src/app/shared/ui-kit/drawer/drawer.tools'
import {RequestBrowserDrawer} from './interfaces/request-browser.drawer'
import {RequestsService} from '../../services/requests.service'
import {BehaviorSubject, filter, map} from 'rxjs'
import {RequestRes} from '../../interfaces/request.interface'

@Injectable()
export class RequestBrowserDrawerService {
	public request$ = new BehaviorSubject<RequestRes | null>(null)
	private ref?: MatDialogRef<RequestBrowserDrawerComponent>

	get request(): RequestRes | null {
		return this.request$.value
	}

	constructor(private dialog: MatDialog) {}

	open(
		data?: DrawerData<RequestBrowserDrawer>
	): MatDialogRef<RequestBrowserDrawerComponent> {
		const config: DrawerData = {
			state: 'view'
		}

		this.ref = this.dialog.open(
			RequestBrowserDrawerComponent,
			drawerConfig(data?.maxWidth, Object.assign(config, data))
		)

		return this.ref
	}
}
