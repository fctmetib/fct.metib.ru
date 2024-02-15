import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'

@Component({
	selector: 'mib-demand-editing-drawer',
	templateUrl: './demand-editing-drawer.component.html',
	styleUrls: ['./demand-editing-drawer.component.scss']
})
export class DemandEditingDrawerComponent {
	constructor(public dialogRef: MatDialogRef<DemandEditingDrawerComponent>) {}
}
