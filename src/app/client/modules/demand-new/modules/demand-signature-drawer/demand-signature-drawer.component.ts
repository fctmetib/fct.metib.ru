import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {extractBase64} from 'src/app/shared/services/tools.service'
import {FileDnd} from 'src/app/shared/ui-kit/drag-and-drop/interfaces/drop-box.interface'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {DocumentReq} from '../../../requests/interfaces/request.interface'

@Component({
	selector: 'mib-demand-signature-drawer',
	templateUrl: './demand-signature-drawer.component.html',
	styleUrls: ['./demand-signature-drawer.component.scss']
})
export class DemandSignatureDrawerComponent {
	constructor(
		public dialogRef: MatDialogRef<DemandSignatureDrawerComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DrawerData
	) {}

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
