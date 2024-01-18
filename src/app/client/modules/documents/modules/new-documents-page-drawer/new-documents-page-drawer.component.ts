import {Component, OnInit} from '@angular/core'
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms'
import {MatDialogRef} from '@angular/material/dialog'
import {BehaviorSubject, finalize, of, tap} from 'rxjs'
import {FileDnd} from 'src/app/shared/ui-kit/drag-and-drop/interfaces/drop-box.interface'
import {ClientDocumentsInterface} from '../../types/common/client-documents.interface'
import {extractBase64} from 'src/app/shared/services/tools.service'
import {DocumentsService} from '../../services/documents.service'
import {AuthService} from 'src/app/auth/services/auth.service'

@Component({
	selector: 'mib-new-documents-page-drawer',
	templateUrl: './new-documents-page-drawer.component.html',
	styleUrls: ['./new-documents-page-drawer.component.scss']
})
export class NewDocumentsPageDrawerComponent implements OnInit {
	public loading$ = new BehaviorSubject<boolean>(false)
	public isSubmitting$ = new BehaviorSubject<boolean>(false)

	size = 'm'

	public userID: number

	public form: FormGroup
	public doc: Partial<ClientDocumentsInterface>

	constructor(
		public dialogRef: MatDialogRef<NewDocumentsPageDrawerComponent>,
		private fb: FormBuilder,
		private documentService: DocumentsService,
		private authService: AuthService
	) {}

	get documents() {
		return this.form.get('Documents') as FormArray
	}

	// this.authService.currentUser.userFactroing.OrganizationID

	// get userID() {
	// 	return this.authService.currentUser$.subscribe({
	// 		next: data => {
	// 			console.log('datasss :>> ', data)
	// 			this.userID$ = +data.userFactoring.OrganizationID
	// 			console.log('this.userID$ :>> ', this.userID$)
	// 		}
	// 	})
	// }

	getCurrentUserId() {
		this.authService.currentUser$.subscribe({
			next: data => {
				// this.userID = +data.userGeneral.ID
				// this.userID = +data.userFactoring.StaffID
				this.userID = +data.userFactoring.OrganizationID
				console.log('userAuthData :>> ', data)
			}
		})
	}

	ngOnInit(): void {
		this.initForm(), this.getCurrentUserData()
		this.getCurrentUserId()
	}

	getCurrentUserData() {
		this.loading$.next(true)
		this.documentService
			.fetchDocuments()
			.pipe(
				tap(data => {
					console.log('documentsList :>> ', data)
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
			isDocumentSign: [null],
			Documents: this.fb.array([], [Validators.required])
		})
	}

	addDocument(data: Partial<ClientDocumentsInterface>) {
		const control: FormGroup = this.fb.group({
			Number: [null],
			Title: [null], //
			Location: [null],
			Description: [null], //
			DocumentStatusID: [null],
			DocumentStatus: [null],
			DocumentTypeID: [null], //
			DocumentType: [null],
			DocumentTypeTitle: [null],
			Available: [null],
			Removed: [null],
			ActiveOrganizationID: [null],
			ActiveOrganization: [null],
			CreatedTime: [null],
			AuthorOrganizationID: [null],
			AuthorOrganization: [null],
			CreatorLastName: [null],
			CreatorFirstName: [null],
			DocumentID: [null],
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
		console.log('this.form[0] :>> ', this.form.value.Documents[0])
		const datas = this.form.value.Documents[0]
		// this.documentService.uploadNewDocument(data)
		// this.dialogRef.close()
		this.documentService.uploadNewDocument(datas).subscribe()
		console.log('SUBMIT>>>>!!')
		// this.dialogRef.close()
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
			OwnerID: this.userID,
			Data: extractBase64(url)
		}
		this.addDocument(document)
		console.log('document :>> ', document)
	}
}
