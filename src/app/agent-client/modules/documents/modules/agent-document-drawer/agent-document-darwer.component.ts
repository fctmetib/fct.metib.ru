import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'

@Component({
	selector: 'mib-agent-document-darwer',
	templateUrl: './agent-document-darwer.component.html',
	styleUrls: ['./agent-document-darwer.component.scss']
})
export class AgentDocumentDarwerComponent {
	constructor(public dialogRef: MatDialogRef<AgentDocumentDarwerComponent>) {}
}
