import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'
import {BehaviorSubject} from 'rxjs'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'
import {ContractedFormsEnum} from 'src/app/shared/ui-kit/contracted-forms/interfaces/contracted-forms.interface'

@Component({
	selector: 'mib-demand-surety-drawer',
	templateUrl: './demand-surety-drawer.component.html',
	styleUrls: ['./demand-surety-drawer.component.scss']
})
export class DemandSuretyDrawerComponent {
	public progres$ = new BehaviorSubject<number>(1)
	public progress: number = 1
	public maxPage: number = 6
	public pageCount: number = 1

	public ContractedFormsEnum = ContractedFormsEnum
	public requisites: string = ''

	constructor(
		private toaster: ToasterService,
		public dialogRef: MatDialogRef<DemandSuretyDrawerComponent>
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

	public saveAccountDate() {
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
}
