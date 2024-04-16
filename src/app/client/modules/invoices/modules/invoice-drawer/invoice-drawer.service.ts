import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {InvoiceDrawerComponent} from './invoice-drawer.component'
import {drawerConfig} from 'src/app/shared/ui-kit/drawer/drawer.tools'
import {InvoiceDrawer} from './interfaces/invoice-drawer.interface'

@Injectable()
export class InvoiceDrawerService {
	constructor(private dialog: MatDialog) {}

	open<T>(
		data?: DrawerData<InvoiceDrawer>
	): MatDialogRef<InvoiceDrawerComponent> {
		const config: DrawerData = {
			state: 'view'
		}
		return this.dialog.open(
			InvoiceDrawerComponent,
			drawerConfig(data?.maxWidth, Object.assign(config, data), {
				disableClose: false
			})
		)
	}
}
