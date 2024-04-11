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

	@Output() onClick = new EventEmitter<Event>()

	public ContractedFormsEnum = ContractedFormsEnum
	public extended: boolean = false

	constructor(private downloadService: WordDownloadService) {}

	downloadRequisites() {
		this.downloadService.downloadDataAsHTML(this.downloadableData)
	}
}
