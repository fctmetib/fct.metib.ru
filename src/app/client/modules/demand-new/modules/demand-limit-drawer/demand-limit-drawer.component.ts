import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'

@Component({
	selector: 'mib-demand-limit-drawer',
	templateUrl: './demand-limit-drawer.component.html',
	styleUrls: ['./demand-limit-drawer.component.scss']
})
export class DemandLimitDrawerComponent {
	constructor(public dialogRef: MatDialogRef<DemandLimitDrawerComponent>) {}
}
