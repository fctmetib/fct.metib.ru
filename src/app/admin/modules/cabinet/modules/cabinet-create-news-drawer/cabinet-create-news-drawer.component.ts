import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'

@Component({
	selector: 'mib-cabinet-create-news-drawer',
	templateUrl: './cabinet-create-news-drawer.component.html',
	styleUrls: ['./cabinet-create-news-drawer.component.scss']
})
export class CabinetCreateNewsDrawerComponent {
	constructor(
		public dialogRef: MatDialogRef<CabinetCreateNewsDrawerComponent>
	) {}

	createNews() {
		console.log('create news >>>')
	}

	closeDrawer() {
		this.dialogRef.close()
	}
}
