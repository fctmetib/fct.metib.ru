import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'
import {BehaviorSubject} from 'rxjs'

@Component({
	selector: 'mib-new-documents-views-drawer',
	templateUrl: './new-documents-views-drawer.component.html',
	styleUrls: ['./new-documents-views-drawer.component.scss']
})
export class NewDocumentsViewsDrawerComponent {
	public loading$ = new BehaviorSubject<boolean>(false)

	size = 'm'

	constructor(
		public dialogRef: MatDialogRef<NewDocumentsViewsDrawerComponent>
	) {}
}
