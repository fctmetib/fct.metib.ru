import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'

@Component({
	selector: 'mib-agent-register-drawer',
	templateUrl: './agent-register-drawer.component.html',
	styleUrls: ['./agent-register-drawer.component.scss']
})
export class AgentRegisterDrawerComponent {
	constructor(public dialogRef: MatDialogRef<AgentRegisterDrawerComponent>) {}
}
