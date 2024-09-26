import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {BehaviorSubject} from 'rxjs'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'
import {ContractedFormsEnum} from 'src/app/shared/ui-kit/contracted-forms/interfaces/contracted-forms.interface'
import {FileDnd} from 'src/app/shared/ui-kit/drag-and-drop/interfaces/drop-box.interface'
import {DocumentReq} from '../../../requests/interfaces/request.interface'
import {extractBase64} from 'src/app/shared/services/tools.service'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'

@Component({
	selector: 'mib-demand-surety-drawer',
	templateUrl: './demand-surety-drawer.component.html',
	styleUrls: ['./demand-surety-drawer.component.scss']
})
export class DemandSuretyDrawerComponent {
	public progres$ = new BehaviorSubject<number>(1)
	public progress: number = 1
	public maxPage: number = 5
	public pageCount: number = 1

	public ContractedFormsEnum = ContractedFormsEnum
	public requisites: string = ''

	constructor(
		private toaster: ToasterService,
		public dialogRef: MatDialogRef<DemandSuretyDrawerComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DrawerData
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

	public confirmIds() {
		this.toaster.show(
			'failure',
			'Функционал в разработке!',
			'',
			true,
			false,
			3000
		)
	}

	public addAccount() {
		this.toaster.show(
			'failure',
			'Функционал в разработке!',
			'',
			true,
			false,
			3000
		)
	}

	public accountEdit() {
		this.toaster.show(
			'failure',
			'Функционал в разработке!',
			'',
			true,
			false,
			3000
		)
	}

	public saveAccountData() {
		this.toaster.show(
			'failure',
			'Функционал в разработке!',
			'',
			true,
			false,
			3000
		)
	}

	public canselAccountData() {
		this.toaster.show(
			'failure',
			'Функционал в разработке!',
			'',
			true,
			false,
			3000
		)
	}

	public saveRealtyData() {
		this.toaster.show(
			'failure',
			'Функционал в разработке!',
			'',
			true,
			false,
			3000
		)
	}

	public canselRealtyData() {
		this.toaster.show(
			'failure',
			'Функционал в разработке!',
			'',
			true,
			false,
			3000
		)
	}

	public addRealty() {
		this.toaster.show(
			'failure',
			'Функционал в разработке!',
			'',
			true,
			false,
			3000
		)
	}

	public saveDebentures() {
		this.toaster.show(
			'failure',
			'Функционал в разработке!',
			'',
			true,
			false,
			3000
		)
	}

	public cancelDebentures() {
		this.toaster.show(
			'failure',
			'Функционал в разработке!',
			'',
			true,
			false,
			3000
		)
	}

	public addDebentures() {
		this.toaster.show(
			'failure',
			'Функционал в разработке!',
			'',
			true,
			false,
			3000
		)
	}

	public addEdms() {
		this.toaster.show(
			'failure',
			'Функционал в разработке!',
			'',
			true,
			false,
			3000
		)
	}

	public cancelEdms() {
		this.toaster.show(
			'failure',
			'Функционал в разработке!',
			'',
			true,
			false,
			3000
		)
	}

	public saveEdms() {
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
