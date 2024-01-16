import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup} from '@angular/forms'
import {MatDialogRef} from '@angular/material/dialog'
import {BehaviorSubject} from 'rxjs'
import {FileDnd} from 'src/app/shared/ui-kit/drag-and-drop/interfaces/drop-box.interface'
import {ClientDocumentsInterface} from '../../types/common/client-documents.interface'
import {extractBase64} from 'src/app/shared/services/tools.service'

@Component({
	selector: 'mib-new-documents-page-drawer',
	templateUrl: './new-documents-page-drawer.component.html',
	styleUrls: ['./new-documents-page-drawer.component.scss']
})
export class NewDocumentsPageDrawerComponent implements OnInit {
	public loading$ = new BehaviorSubject<boolean>(false)
	public isSubmitting$ = new BehaviorSubject<boolean>(false)

	size = 'm'

	public form: FormGroup

	constructor(
		public dialogRef: MatDialogRef<NewDocumentsPageDrawerComponent>,
		private fb: FormBuilder
	) {}

	ngOnInit(): void {
		this.initForm()
	}

	initForm() {
		this.form = this.fb.group({})
	}

	onSubmit(): void {
		console.log('halo submit')
	}

	onDocumentLoad({file, url}: FileDnd) {
		const document: Partial<ClientDocumentsInterface> = {
			Description: `description ${file.name}`,
			DocumentTypeID: 40,
			Title: file.name,
			OwnerTypeID: 20,
			Data: extractBase64(url)
		}
		console.log('document :>> ', document)
		// this.addDocument(document)
	}
}
