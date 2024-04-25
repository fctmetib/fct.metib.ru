import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'

@Component({
	selector: 'mib-cabinet-create-news-drawer',
	templateUrl: './cabinet-create-news-drawer.component.html',
	styleUrls: ['./cabinet-create-news-drawer.component.scss']
})
export class CabinetCreateNewsDrawerComponent implements OnInit {
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: DrawerData,
		public dialogRef: MatDialogRef<CabinetCreateNewsDrawerComponent>
	) {}

	ngOnInit(): void {
		console.log('this.data :>> ', this.data)
	}

	get newsID() {
		return this.data?.data.id
	}

	createNews() {
		console.log('create news >>>')
	}

	closeDrawer() {
		this.dialogRef.close()
	}
}
