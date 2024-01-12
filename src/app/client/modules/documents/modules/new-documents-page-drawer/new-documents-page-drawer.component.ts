import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'
import {BehaviorSubject} from 'rxjs'

@Component({
	selector: 'mib-new-documents-page-drawer',
	templateUrl: './new-documents-page-drawer.component.html',
	styleUrls: ['./new-documents-page-drawer.component.scss']
})
export class NewDocumentsPageDrawerComponent {
	public loading$ = new BehaviorSubject<boolean>(false)

	size = 'm'

	constructor(
		public dialogRef: MatDialogRef<NewDocumentsPageDrawerComponent>
	) {}
}
