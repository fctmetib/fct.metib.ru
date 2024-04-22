import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'

@Component({
	selector: 'mib-cabinet-edit-news-drawer',
	templateUrl: './cabinet-edit-news-drawer.component.html',
	styleUrls: ['./cabinet-edit-news-drawer.component.scss']
})
export class CabinetEditNewsDrawerComponent {
	constructor(public dialogRef: MatDialogRef<CabinetEditNewsDrawerComponent>) {}
}
