import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {Clipboard} from '@angular/cdk/clipboard'

@Component({
	selector: 'mib-demand-page-history-modal',
	templateUrl: './demand-page-history-modal.component.html',
	styleUrls: ['./demand-page-history-modal.component.scss']
})
export class DemandPageHistoryModalComponent {
	copied: boolean = false
	constructor(
		public dialogRef: MatDialogRef<DemandPageHistoryModalComponent>,
		private clipboard: Clipboard,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		console.log('data :>> ', data)
	}

	public getStatus(status: string): string {
		let result: string = ''
		switch (status) {
			case 'Created':
				result = 'Создан'
				break
			case 'Completed':
				result = 'Завершен'
				break
			case 'Processing':
				result = 'В процессе'
				break
			case 'Rejected':
				result = 'Отклонено'
				break
			case 'Draft':
				result = 'Черновик'
				break
			case 'Canceled':
				result = 'Отменен'
				break
		}
		return result
	}

	getType(type: string): string {
		let result: string = ''
		switch (type) {
			case 'VerificationChannel':
				result = 'Верификация'
				break
			case 'Guarantee':
				result = 'Поручительство'
				break
			case 'Factoring':
				result = 'Факторинг'
				break
			case 'DigitalSignature':
				result = 'ЭЦП'
				break
			case 'ProfileChange':
				result = 'Редактирование Профиля'
				break
			case 'Question':
				result = 'Свободная тема'
				break
			case 'Limit':
				result = 'Лимит'
				break
			case 'NewDebtor':
				result = 'Новый дебитор'
				break
			case 'AgencyFactoring':
				result = 'Агентский Факторинг'
				break
			default:
				result = 'Свободная тема'
				break
		}
		return result
	}

	requestEdit() {
		console.log('EDIT REQUEST>>>')
	}

	public copyData(data) {
		this.clipboard.copy(data)
		this.copied = true
		setTimeout(() => (this.copied = false), 2000)
	}
}
