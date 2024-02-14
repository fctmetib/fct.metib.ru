import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'

@Component({
	selector: 'mib-demand-surety-drawer',
	templateUrl: './demand-surety-drawer.component.html',
	styleUrls: ['./demand-surety-drawer.component.scss']
})
export class DemandSuretyDrawerComponent {
	constructor(public dialogRef: MatDialogRef<DemandSuretyDrawerComponent>) {}
}
