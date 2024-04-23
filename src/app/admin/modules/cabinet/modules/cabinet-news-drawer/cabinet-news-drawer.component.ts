import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'
import {DrawerStateEnum} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {CabinetCreateNewsDrawerService} from '../cabinet-create-news-drawer/cabinet-create-news-drawer.service'

@Component({
	selector: 'mib-cabinet-news-drawer',
	templateUrl: './cabinet-news-drawer.component.html',
	styleUrls: ['./cabinet-news-drawer.component.scss']
})
export class CabinetNewsDrawerComponent {
	constructor(
		public dialogRef: MatDialogRef<CabinetNewsDrawerComponent>,
		private сabinetCreateNewsDrawerService: CabinetCreateNewsDrawerService
	) {}

	editNews() {
		console.log('edit news >>>')
		this.dialogRef.close()
		this.openCreateNewsDrawer()
	}

	removeNews() {
		console.log('remove news >>>')
	}

	openCreateNewsDrawer() {
		this.сabinetCreateNewsDrawerService
			.open({state: DrawerStateEnum.CREATE})
			.afterClosed()
			.subscribe()
	}
}
