import {Component, OnInit} from '@angular/core'
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms'
import {MatDialogRef} from '@angular/material/dialog'
import {
	BehaviorSubject,
	finalize,
	zip,
	tap,
	defer,
	map,
	catchError,
	of
} from 'rxjs'
import {FileDnd} from 'src/app/shared/ui-kit/drag-and-drop/interfaces/drop-box.interface'
import {extractBase64} from 'src/app/shared/services/tools.service'
import {DocumentsService} from '../../services/documents.service'
import {AuthService} from 'src/app/auth/services/auth.service'
import {ButtonSize} from '../../../../../shared/ui-kit/button/interfaces/button.interface'
import {
	DocumentReq,
	DocumentRes
} from '../../../requests/interfaces/request.interface'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'

@Component({
	selector: 'mib-new-documents-page-drawer',
	templateUrl: './document-drawer.component.html',
	styleUrls: ['./document-drawer.component.scss']
})
export class DocumentDrawerComponent implements OnInit {
	public loading$ = new BehaviorSubject<boolean>(false)
	public isSubmitting$ = new BehaviorSubject<boolean>(false)
	public size: ButtonSize = 'm'
	public form: FormGroup

	get documents() {
		return this.form.get('Documents') as FormArray
	}

	get isDocumentSign(): boolean {
		return this.form.get('isDocumentSign').value
	}

	get userFactoring() {
		return this.authService.currentUser$.value.userFactoring
	}

	constructor(
		public dialogRef: MatDialogRef<DocumentDrawerComponent>,
		private fb: FormBuilder,
		private documentService: DocumentsService,
		private authService: AuthService,
		private toaster: ToasterService
	) {}

	ngOnInit(): void {
		this.initForm()
		this.getCurrentUserData()
	}

	getCurrentUserData() {
		this.loading$.next(true)
		this.documentService
			.fetchDocuments()
			.pipe(
				tap(data => {
					console.log('documentsList: ', data)
				}),
				finalize(() => {
					this.loading$.next(false)
				})
			)
			.subscribe()
	}

	initForm() {
		this.form = this.fb.group({
			documentDescription: [null],
			isDocumentSign: [true],
			Documents: this.fb.array([], [Validators.required])
		})
	}

	addDocument(data: DocumentReq) {
		const control: FormGroup = this.fb.group({
			Number: [null],
			Title: [null],
			Description: [null],
			DocumentTypeID: [null],
			OwnerTypeID: [null],
			Data: [null]
		})
		control.patchValue(data)
		this.documents.push(control)
	}

	onSubmit(): void {
		const documents: DocumentReq[] = this.documents.value
		// TODO: СДЕЛАТЬ ПОДПИСЬ ПРИ needSign (TRUE)

		defer(() => {
			this.isSubmitting$.next(true)
			const reqs$ = documents.map(document =>
				this.documentService.uploadNewDocument(document, this.isDocumentSign)
			)
			const req$ = zip(reqs$).pipe(
				tap(() => {
					this.toaster.show(
						'success',
						'Документ добавлен',
						'',
						true,
						false,
						3000
					)
				})
			)
			if (this.isDocumentSign) {
				return this.documentService
					.signModal(req$, this.isSubmitting$)
					.pipe(map(output => output.data))
			} else {
				return req$.pipe(
					finalize(() => {
						this.isSubmitting$.next(false)
					})
				)
			}
		})
			.pipe(
				finalize(() => {
					this.dialogRef.close()
				})
			)
			.subscribe()
	}

	removeDocument(idx: number) {
		this.documents.removeAt(idx)
	}

	onDocumentLoad({file, url}: FileDnd) {
		const document: DocumentReq = {
			// TODO: ДОБАВИТЬ ИНПУТ С "type='number'" В ФОРМУ
			Number: null,
			Title: file.name,
			Description: `description ${file.name}`,
			DocumentTypeID: 40,
			OwnerTypeID: 6,
			// Бекенд сказал, что информация берётся из токена
			// OwnerID: this.userFactoring.OrganizationID,
			Data: extractBase64(url)
		}
		this.addDocument(document)
	}
}
