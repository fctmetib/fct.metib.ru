import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {extractBase64} from 'src/app/shared/services/tools.service'
import {FileDnd} from 'src/app/shared/ui-kit/drag-and-drop/interfaces/drop-box.interface'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {DocumentReq} from '../../../requests/interfaces/request.interface'
import {BehaviorSubject} from 'rxjs'

// export type ProgStatus = 1 | 2 | 3 | 4

@Component({
	selector: 'mib-demand-signature-drawer',
	templateUrl: './demand-signature-drawer.component.html',
	styleUrls: ['./demand-signature-drawer.component.scss']
})
export class DemandSignatureDrawerComponent {
	// public prog: ProgStatus
	public progres$ = new BehaviorSubject<number>(1)
	public progress: number = 1
	public maxPage: number = 4
	public pageCount: number = 1

	constructor(
		public dialogRef: MatDialogRef<DemandSignatureDrawerComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DrawerData
	) {}

	public nextPage() {
		if (this.pageCount >= 1 && this.pageCount <= this.maxPage - 1) {
			this.progress = this.progres$.value + 1
			this.progres$.next(this.progress)
			this.pageCount = this.progress
			console.log('next', this.progress)
		} else {
			return
		}
	}

	public prevPage() {
		if (this.pageCount >= 2 && this.pageCount <= this.maxPage) {
			this.progress = this.progres$.value - 1
			this.progres$.next(this.progress)
			this.pageCount = this.progress
			console.log('prev', this.progress)
		} else {
			return
		}
	}

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
