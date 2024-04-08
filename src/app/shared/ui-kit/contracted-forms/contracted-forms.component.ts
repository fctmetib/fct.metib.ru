import {Component, EventEmitter, Input, Output} from '@angular/core'
import {
	ContractedFormsEnum,
	ContractedFormsState,
	BankDetailsData
} from './interfaces/contracted-forms.interface'
import {WordDownloadService} from '../../services/word-download.service'
import {ExtendedClientInvoice} from 'src/app/client/modules/invoices/interfaces/client.invoice'

@Component({
	selector: 'mib-contracted-forms',
	templateUrl: './contracted-forms.component.html',
	styleUrls: ['./contracted-forms.component.scss']
})
export class ContractedFormsComponent {
	@Input() state: ContractedFormsState = 'view'
	// @Input() device: ContractedFormsDevice = 'Desktop'
	@Input() type: ContractedFormsEnum = ContractedFormsEnum.BankDetails
	@Input() label?: string = ''
	@Input() description?: string = ''
	@Input() mainBank: boolean = false
	@Input() showBadge: boolean = false
	@Input() additionalOffice: string = ''

	// Типы входных данных
	@Input() data?: BankDetailsData
	@Input() downloadableData?: ExtendedClientInvoice
	// @Input() bankingDetails?: BankDetailsData

	@Output() onClick = new EventEmitter<Event>()

	public ContractedFormsEnum = ContractedFormsEnum
	public extended: boolean = false

	constructor(private downloadService: WordDownloadService) {}

	// getRequisitesAsString(datass) {
	// 	console.log('halo datass>>>', datass)
	// 	return datass
	// }
	// getRequisitesAsString(): string {
	// 	if (!this.bankingDetails || !this.bankingDetails.paymentParticipant) {
	// 		return 'Реквизиты не указаны'
	// 	}

	// 	const {paymentParticipant, openDate, closeDate} = this.bankingDetails
	// 	const requisitesStr =
	// 		`Реквизиты:\n` +
	// 		`Номер счета: ${paymentParticipant.Account}\n` +
	// 		`ИНН: ${paymentParticipant.INN}\n` +
	// 		`БИК: ${paymentParticipant.BIC}\n` +
	// 		`Название банка: ${paymentParticipant.BankName || 'Не указано'}\n` +
	// 		`Корр. счет: ${paymentParticipant.BankAccount}\n` +
	// 		`Дата открытия: ${openDate}\n` +
	// 		`Дата закрытия: ${closeDate}`

	// 	return requisitesStr
	// }

	// getRequisitesAsString(): string {
	//   if (!this.bankingDetails || !this.bankingDetails.paymentParticipant) {
	//     return 'Реквизиты не указаны';
	//   }

	//   const { paymentParticipant, openDate, closeDate } = this.bankingDetails;
	//   const requisitesStr = `Реквизиты:\n` +
	//     `Номер счета: ${paymentParticipant.Account}\n` +
	//     `ИНН: ${paymentParticipant.INN}\n` +
	//     `БИК: ${paymentParticipant.BIC}\n` +
	//     `Название банка: ${paymentParticipant.BankName || 'Не указано'}\n` +
	//     `Корр. счет: ${paymentParticipant.BankAccount}\n` +
	//     `Дата открытия: ${openDate}\n` +
	//     `Дата закрытия: ${closeDate}`;

	//   return requisitesStr;
	// }

	downloadRequisites() {
		// const requisitesStr = this.getRequisitesAsString(this.datass)
		// console.log('requisitesStr :>> ', requisitesStr.paymentParticipant)
		this.downloadService.downloadDataAsHTML(this.downloadableData)
		// this.downloadService.downloadDocWithText(requisitesStr, `${this.bankingDetails.paymentParticipant.Title} реквизиты`)
	}
}
