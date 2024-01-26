import {Component, OnInit} from '@angular/core'
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms'
import {MatDialogRef} from '@angular/material/dialog'
import {BehaviorSubject, finalize, zip, tap} from 'rxjs'
import {FileDnd} from 'src/app/shared/ui-kit/drag-and-drop/interfaces/drop-box.interface'
import {extractBase64} from 'src/app/shared/services/tools.service'
import {DocumentsService} from '../../services/documents.service'
import {AuthService} from 'src/app/auth/services/auth.service'
import {ButtonSize} from '../../../../../shared/ui-kit/button/interfaces/button.interface';
import {DocumentReq, DocumentRes} from '../../../requests/interfaces/request.interface';

@Component({
	selector: 'mib-new-documents-page-drawer',
	templateUrl: './documents-drawer.component.html',
	styleUrls: ['./documents-drawer.component.scss']
})
export class DocumentsDrawerComponent implements OnInit {
	public loading$ = new BehaviorSubject<boolean>(false)
	public isSubmitting$ = new BehaviorSubject<boolean>(false)
  public size: ButtonSize = 'm'
	public form: FormGroup

	constructor(
		public dialogRef: MatDialogRef<DocumentsDrawerComponent>,
		private fb: FormBuilder,
		private documentService: DocumentsService,
		private authService: AuthService
	) {}

	get documents() {
		return this.form.get('Documents') as FormArray
	}

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
			isDocumentSign: [false],
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
			OwnerID: [null],
			Data: [null]
		})
		control.patchValue(data)
		this.documents.push(control)
	}

	onSubmit(): void {
		const documents: DocumentRes[] = this.form.getRawValue().Documents
    const needSign: boolean = this.form.get('isDocumentSign').value;

    // TODO: СДЕЛАТЬ ПОДПИСЬ ПРИ needSign (TRUE)

    zip(
      documents.map(document => this.documentService.uploadNewDocument(document, needSign))
    ).pipe(
      tap(() => {

      }),
      finalize(() => {

      })
    ).subscribe()
	}

	removeDocument(idx: number) {
		this.documents.removeAt(idx)
	}

	onDocumentLoad({file, url}: FileDnd) {
		const document: DocumentReq = {
      Number: null,
			Title: file.name,
			Description: `description ${file.name}`,
			DocumentTypeID: 40,
			OwnerTypeID: 6,
			OwnerID: this.authService.currentUser$.value.userFactoring.OrganizationID,
			Data: extractBase64(url)
		}
		this.addDocument(document)
	}
}

