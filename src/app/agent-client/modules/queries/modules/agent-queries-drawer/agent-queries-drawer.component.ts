import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'

@Component({
	selector: 'mib-agent-queries-drawer',
	templateUrl: './agent-queries-drawer.component.html',
	styleUrls: ['./agent-queries-drawer.component.scss']
})
export class AgentQueriesDrawerComponent {
	constructor(public dialogRef: MatDialogRef<AgentQueriesDrawerComponent>) {}
}
