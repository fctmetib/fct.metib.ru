import {Component, Inject} from '@angular/core'
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'
import {ButtonSize} from 'src/app/shared/ui-kit/button/interfaces/button.interface'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {InputSize} from 'src/app/shared/ui-kit/input/interfaces/input.interface'
import {DocumentReq} from '../../../requests/interfaces/request.interface'
import {FileDnd} from 'src/app/shared/ui-kit/drag-and-drop/interfaces/drop-box.interface'
import {extractBase64} from 'src/app/shared/services/tools.service'

@Component({
	selector: 'mib-verify-request-drawer',
	templateUrl: './verify-request-drawer.component.html',
	styleUrls: ['./verify-request-drawer.component.scss']
})
export class VerifyRequestDrawerComponent {
	public form: FormGroup

	public size: InputSize | ButtonSize = 'm'

	constructor(
		private fb: FormBuilder,
		private toaster: ToasterService,
		public dialogRef: MatDialogRef<VerifyRequestDrawerComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DrawerData
	) {}

	get documents() {
		return this.form.get('Documents') as FormArray
	}

	ngOnInit(): void {
		this.initForms()
	}

	initForms() {
		this.form = this.fb.group({
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

	public editDocument() {
		this.toaster.show(
			'failure',
			'Функционал в разработке!',
			'',
			true,
			false,
			3000
		)
	}
}
