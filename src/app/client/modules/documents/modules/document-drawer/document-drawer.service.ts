import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {DocumentDrawerComponent} from './document-drawer.component'
import {drawerConfig} from 'src/app/shared/ui-kit/drawer/drawer.tools'

@Injectable({
	providedIn: 'root'
})
export class DocumentDrawerService {
	constructor(private dialog: MatDialog) {}

	open(
		data?: DrawerData<any>
	): MatDialogRef<DocumentDrawerComponent, number[]> {
		const config: DrawerData = {
			state: 'view'
		}
		return this.dialog.open(
			DocumentDrawerComponent,
			drawerConfig(data?.maxWidth, Object.assign(config, data))
		)
	}
}
