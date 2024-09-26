import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {drawerConfig} from 'src/app/shared/ui-kit/drawer/drawer.tools'
import {DemandSignatureDrawerComponent} from './demand-signature-drawer.component'

@Injectable()
export class DemandSignatureDrawerService {
	constructor(private dialog: MatDialog) {}

	open(
		data?: DrawerData<any>
	): MatDialogRef<DemandSignatureDrawerComponent, number[]> {
		const config: DrawerData = {}
		return this.dialog.open(
			DemandSignatureDrawerComponent,
			drawerConfig(data?.maxWidth, Object.assign(config, data))
		)
	}
}
