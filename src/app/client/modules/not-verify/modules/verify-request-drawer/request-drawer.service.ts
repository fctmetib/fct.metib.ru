import {Injectable} from '@angular/core'
import {MatDialog} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {VerifyRequestDrawerComponent} from './verify-request-drawer.component'
import {drawerConfig} from 'src/app/shared/ui-kit/drawer/drawer.tools'
import {DemandDrawerRef} from './interfaces/request-drawer.interface'

@Injectable()
export class RequestDrawerService {
	constructor(private dialog: MatDialog) {}

	public ref?: DemandDrawerRef

	open(data?: DrawerData): DemandDrawerRef {
		const config: DrawerData = {
			state: 'view'
		}
		this.ref = this.dialog.open(
			VerifyRequestDrawerComponent,
			drawerConfig(data?.maxWidth, Object.assign(config, data))
		)

		return this.ref
	}

	get drawerData() {
		return this.ref?.componentInstance?.data
	}
}
