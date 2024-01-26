import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {DocumentViewDrawerComponent} from './document-view-drawer.component'
import {drawerConfig} from 'src/app/shared/ui-kit/drawer/drawer.tools'
import {DocumentViewsDrawerData} from './interfaces/document-views-drawer.data'

@Injectable({
	providedIn: 'root'
})
export class DocumentViewDrawerService {
	constructor(private dialog: MatDialog) {}

	open(data: DrawerData<DocumentViewsDrawerData>): MatDialogRef<DocumentViewDrawerComponent, number[]> {
		const config: DrawerData = {
			state: 'view'
		}
		return this.dialog.open(
			DocumentViewDrawerComponent,
			drawerConfig(data?.maxWidth, Object.assign(config, data))
		)
	}
}
