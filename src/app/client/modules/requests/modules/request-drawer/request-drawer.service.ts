import { Injectable } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { DrawerData } from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface'
import { RequestDrawerComponent } from './request-drawer.component'
import { drawerConfig } from '../../../../../shared/ui-kit/drawer/drawer.tools'
import {RequestRes} from '../../interfaces/request.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestDrawerService {
	constructor(private dialog: MatDialog) {}

	open(data?: DrawerData<RequestRes>): MatDialogRef<RequestDrawerComponent, number[]> {
		const config: DrawerData = {
			state: 'view'
		}
		return this.dialog.open(
			RequestDrawerComponent,
			drawerConfig(data?.maxWidth, Object.assign(config, data))
		)
	}
}
