import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'
import {FileDnd} from 'src/app/shared/ui-kit/drag-and-drop/interfaces/drop-box.interface'
import {DocumentReq} from '../../../requests/interfaces/request.interface'
import {extractBase64} from 'src/app/shared/services/tools.service'

@Component({
	selector: 'mib-demand-editing-drawer',
	templateUrl: './demand-editing-drawer.component.html',
	styleUrls: ['./demand-editing-drawer.component.scss']
})
export class DemandEditingDrawerComponent {
	constructor(public dialogRef: MatDialogRef<DemandEditingDrawerComponent>) {}

	onDocumentLoad({file, url}: FileDnd) {
		const document: DocumentReq = {
			Description: `description ${file.name}`,
			DocumentTypeID: 40,
			Title: file.name,
			OwnerTypeID: 20,
			Data: extractBase64(url)
		}
		// this.addDocument(document)
	}
}
