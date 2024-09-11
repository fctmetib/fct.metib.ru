import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'

@Component({
	selector: 'mib-agent-register-view-drawer',
	templateUrl: './agent-register-view-drawer.component.html',
	styleUrls: ['./agent-register-view-drawer.component.scss']
})
export class AgentRegisterViewDrawerComponent {
	constructor(
		public dialogRef: MatDialogRef<AgentRegisterViewDrawerComponent>
	) {}
}
