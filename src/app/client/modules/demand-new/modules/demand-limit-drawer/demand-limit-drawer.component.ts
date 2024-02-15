import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'
import {FileDnd} from 'src/app/shared/ui-kit/drag-and-drop/interfaces/drop-box.interface'
import {DocumentReq} from '../../../requests/interfaces/request.interface'
import {extractBase64} from 'src/app/shared/services/tools.service'

@Component({
	selector: 'mib-demand-limit-drawer',
	templateUrl: './demand-limit-drawer.component.html',
	styleUrls: ['./demand-limit-drawer.component.scss']
})
export class DemandLimitDrawerComponent {
	constructor(public dialogRef: MatDialogRef<DemandLimitDrawerComponent>) {}

	data = 20000

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
