import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {FileDnd} from 'src/app/shared/ui-kit/drag-and-drop/interfaces/drop-box.interface'
import {DocumentReq} from '../../../requests/interfaces/request.interface'
import {extractBase64} from 'src/app/shared/services/tools.service'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'
import {DrawerData} from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface'

@Component({
	selector: 'mib-demand-limit-drawer',
	templateUrl: './demand-limit-drawer.component.html',
	styleUrls: ['./demand-limit-drawer.component.scss']
})
export class DemandLimitDrawerComponent {
	constructor(
		private toaster: ToasterService,
		public dialogRef: MatDialogRef<DemandLimitDrawerComponent>,
  @Inject(MAT_DIALOG_DATA) public info: DrawerData
) {
  console.log(info.data.id)
}

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
