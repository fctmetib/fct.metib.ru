import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {NewDocumentsViewsDrawerComponent} from './new-documents-views-drawer.component'
import {drawerConfig} from 'src/app/shared/ui-kit/drawer/drawer.tools'
import {NewDocumentsViewsDrawerInterface} from './interfaces/new-documents-views-drawer.interface'

@Injectable({
	providedIn: 'root'
})
export class NewDocumentsViewsDrawerService {
	constructor(private dialog: MatDialog) {}

	open(
		data?: DrawerData<NewDocumentsViewsDrawerInterface>
	): MatDialogRef<NewDocumentsViewsDrawerComponent, number[]> {
		const config: DrawerData = {
			state: 'view'
		}
		return this.dialog.open(
			NewDocumentsViewsDrawerComponent,
			drawerConfig(data?.maxWidth, Object.assign(config, data))
		)
	}
}
