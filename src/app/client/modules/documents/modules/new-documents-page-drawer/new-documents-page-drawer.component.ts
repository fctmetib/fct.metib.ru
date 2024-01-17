import {Component, OnInit} from '@angular/core'
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms'
import {MatDialogRef} from '@angular/material/dialog'
import {BehaviorSubject, of} from 'rxjs'
import {FileDnd} from 'src/app/shared/ui-kit/drag-and-drop/interfaces/drop-box.interface'
import {ClientDocumentsInterface} from '../../types/common/client-documents.interface'
import {extractBase64} from 'src/app/shared/services/tools.service'
import {DocumentsService} from '../../services/documents.service'

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
	public doc: Partial<ClientDocumentsInterface>

	constructor(
		public dialogRef: MatDialogRef<NewDocumentsPageDrawerComponent>,
		private fb: FormBuilder,
		private documentService: DocumentsService
	) {}

	get documents() {
		return this.form.get('Documents') as FormArray
	}

	ngOnInit(): void {
		this.initForm()
	}

	initForm() {
		this.form = this.fb.group({
			documentDescription: [null],
			isDocumentSign: [null],
			Number: [null],
			Date: [null],
			Type: [null, [Validators.required]],
			Status: [null],
			Summ: [0, [Validators.required]],
			ReadOnly: [false, [Validators.required]],
			IsCorrected: [false, [Validators.required]],
			Delivery: this.fb.group({
				CurrencyCode: [null, [Validators.required]],
				Title: [null, [Validators.required]],
				CustomerID: [null, [Validators.required]],
				Customer: [null, [Validators.required]],
				DebtorID: [null, [Validators.required]],
				Debtor: [null, [Validators.required]],
				ID: [null, [Validators.required]]
			}),
			Documents: this.fb.array([], [Validators.required])
		})
	}

	addDocument(data: Partial<ClientDocumentsInterface>) {
		const control: FormGroup = this.fb.group({
			// Number: [null],
			Title: [null], //
			// Location: [null],
			Description: [null], //
			// DocumentStatusID: [null],
			// DocumentStatus: [null],
			DocumentTypeID: [null], //
			// DocumentType: [null],
			// DocumentTypeTitle: [null],
			// Available: [null],
			// Removed: [null],
			// ActiveOrganizationID: [null],
			// ActiveOrganization: [null],
			// CreatedTime: [null],
			// AuthorOrganizationID: [null],
			// AuthorOrganization: [null],
			// CreatorLastName: [null],
			// CreatorFirstName: [null],
			// DocumentID: [null],
			OwnerTypeID: [null], //
			OwnerID: [null], //
			Data: [null] //
		})
		control.patchValue(data)
		this.documents.push(control)
	}

	onSubmit(): void {
		const data: ClientDocumentsInterface = this.form.getRawValue()
		console.log('SUBMIT>>.getRawValue :>> ', data)
		this.documentService.uploadNewDocument(data)
		this.dialogRef.close()
	}

	removeDocument(idx: number) {
		console.log('remove>>>', idx)
	}

	onDocumentLoad({file, url}: FileDnd) {
		const document: Partial<ClientDocumentsInterface> = {
			Description: `description ${file.name}`,
			DocumentTypeID: 40,
			Title: file.name,
			OwnerTypeID: 20,
			Data: extractBase64(url)
		}
		this.addDocument(document)
		console.log('document :>> ', document)
	}
}
