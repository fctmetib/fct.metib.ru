import {Injectable} from '@angular/core'
import {RequestBrowserDrawerComponent} from './request-browser-drawer.component'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {drawerConfig} from 'src/app/shared/ui-kit/drawer/drawer.tools'
import {RequestBrowserDrawer} from './interfaces/request-browser.drawer'
import {RequestsService} from '../../services/requests.service'
// import {response} from 'express'
// import {Observable, map} from 'rxjs'

@Injectable()
export class RequestBrowserDrawerService {
	constructor(
		private dialog: MatDialog,
		private requestsService: RequestsService
	) {}

	// open(
	// 	data?: DrawerData<RequestBrowserDrawer>
	// ): Observable<MatDialogRef<RequestBrowserDrawerComponent>> {
	// 	const config: DrawerData = {
	// 		state: 'view'
	// 	}
	// 	return this.requestsService
	// 		.getRequest(+data?.data?.requestId)
	// 		.pipe(
	// 			map(response =>
	// 				this.dialog.open(
	// 					RequestBrowserDrawerComponent,
	// 					drawerConfig(data?.maxWidth, Object.assign(config, data))
	// 				)
	// 			)
	// 		)
	// }

	open(
		data?: DrawerData<RequestBrowserDrawer>
	): MatDialogRef<RequestBrowserDrawerComponent> {
		const config: DrawerData = {
			state: 'view'
		}
		return this.dialog.open(
			RequestBrowserDrawerComponent,
			drawerConfig(data?.maxWidth, Object.assign(config, data))
		)
	}
}
