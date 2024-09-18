import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {Clipboard} from '@angular/cdk/clipboard'
import {BehaviorSubject, finalize, tap} from 'rxjs'
import {DocumentsService} from 'src/app/client/modules/documents/services/documents.service'
import {downloadBase64File} from 'src/app/shared/services/tools.service'

@Component({
	selector: 'mib-documents-page-factoring-modal',
	templateUrl: './documents-page-factoring-modal.component.html',
	styleUrls: ['./documents-page-factoring-modal.component.scss']
})
export class DocumentsPageFactoringModalComponent {
	copied: boolean = false
	public isDownloading$ = new BehaviorSubject<boolean>(false)

	constructor(
		public dialogRef: MatDialogRef<DocumentsPageFactoringModalComponent>,
		private clipboard: Clipboard,
		private documentsService: DocumentsService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	downloadCurrentFile() {
		this.isDownloading$.next(true)
		this.documentsService
			.getDocumentContent(this.data.doc.DocumentID)
			.pipe(
				tap(data => {
					downloadBase64File(data, this.data.doc.Title)
				}),
				finalize(() => {
					this.isDownloading$.next(false)
				})
			)
			.subscribe()
	}

	public copyData(data) {
		this.clipboard.copy(data)
		this.copied = true
		setTimeout(() => (this.copied = false), 2000)
	}
}
