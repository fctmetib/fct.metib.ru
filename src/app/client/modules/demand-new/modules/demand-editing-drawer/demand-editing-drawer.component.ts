import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'
import {FileDnd} from 'src/app/shared/ui-kit/drag-and-drop/interfaces/drop-box.interface'
import {DocumentReq} from '../../../requests/interfaces/request.interface'
import {extractBase64} from 'src/app/shared/services/tools.service'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'

@Component({
	selector: 'mib-demand-editing-drawer',
	templateUrl: './demand-editing-drawer.component.html',
	styleUrls: ['./demand-editing-drawer.component.scss']
})
export class DemandEditingDrawerComponent {
	constructor(
		private toaster: ToasterService,
		public dialogRef: MatDialogRef<DemandEditingDrawerComponent>
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

	public submitData() {
		this.toaster.show(
			'failure',
			'Функционал в разработке!',
			'',
			true,
			false,
			3000
		)
		// this.dialogRef.close()
	}
}
