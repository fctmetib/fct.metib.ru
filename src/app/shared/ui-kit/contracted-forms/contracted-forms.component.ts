import {Component, EventEmitter, Input, Output} from '@angular/core'
import {
	ContractedFormsDevice,
	ContractedFormsState,
	ContractedFormsType
} from './interfaces/contracted-forms.interface'

@Component({
	selector: 'mib-contracted-forms',
	templateUrl: './contracted-forms.component.html',
	styleUrls: ['./contracted-forms.component.scss']
})
export class ContractedFormsComponent {
	@Input() state: ContractedFormsState = 'view'
	@Input() extended: boolean = false
	@Input() device: ContractedFormsDevice = 'Desktop'
	@Input() type: ContractedFormsType = 'Банковские реквизиты'
	@Input() mainBank: boolean = false
	@Input() showBadge: boolean = false
	@Input() additionalOffice: string = ''

	@Output() onClick: EventEmitter<Event>
}
