import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'

@Component({
	selector: 'mib-agent-payments-drawer',
	templateUrl: './agent-payments-drawer.component.html',
	styleUrls: ['./agent-payments-drawer.component.scss']
})
export class AgentPaymentsDrawerComponent {
	constructor(public dialogRef: MatDialogRef<AgentPaymentsDrawerComponent>) {}
}
