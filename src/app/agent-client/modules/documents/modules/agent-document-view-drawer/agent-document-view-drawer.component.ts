import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'

@Component({
	selector: 'mib-agent-document-view-drawer',
	templateUrl: './agent-document-view-drawer.component.html',
	styleUrls: ['./agent-document-view-drawer.component.scss']
})
export class AgentDocumentViewDrawerComponent {
	constructor(
		public dialogRef: MatDialogRef<AgentDocumentViewDrawerComponent>
	) {}
}
