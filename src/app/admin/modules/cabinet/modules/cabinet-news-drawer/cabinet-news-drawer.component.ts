import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'

@Component({
	selector: 'mib-cabinet-news-drawer',
	templateUrl: './cabinet-news-drawer.component.html',
	styleUrls: ['./cabinet-news-drawer.component.scss']
})
export class CabinetNewsDrawerComponent {
	constructor(public dialogRef: MatDialogRef<CabinetNewsDrawerComponent>) {}

	editNews() {
		console.log('edit news >>>')
	}

	removeNews() {
		console.log('remove news >>>')
	}
}
