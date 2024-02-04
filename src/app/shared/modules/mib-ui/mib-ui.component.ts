import {Component, OnInit} from '@angular/core'
import {InputSize} from '../../ui-kit/input/interfaces/input.interface'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {NewShipmentModalService} from '../modals/new-shipment-modal/new-shipment-modal.service'
import {RequestCreateSuccessModalService} from '../modals/request-create-success-modal/request-create-success-modal.service'
import {RequestInfoModalService} from '../modals/request-info-modal/request-info-modal.service'
import {RequestFailureModalService} from '../modals/request-failure-modal/request-failure-modal.service'
import {ToasterService} from '../../services/common/toaster.service'

@Component({
	selector: 'app-mib-ui',
	templateUrl: './mib-ui.component.html',
	styles: [
		`
			:host:has(mib-header) {
				padding: 8rem 15px;
			}
			:host {
				max-width: 1200px;
				display: block;
				margin: auto;
				padding: 0 15px;
				overflow: auto;
				height: -webkit-fill-available;
			}
			.btn-wrapper {
				display: flex;
				gap: 2rem;
				flex-wrap: wrap;
			}
			.input-wrapper {
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
				gap: 2rem;
			}
			.test-badge {
				display: flex;
				gap: 1rem;
				margin: 2rem 0;
				flex-wrap: wrap;
			}
		`
	]
})
export class MibUiComponent implements OnInit {
	isShownBtns = false
	isShownInputs = false
	isShownTextarea = false
	isShownBadges = false
	isShownSwitch = false
	isShownTag = false
	isShownHeader = false
	isShownToaster = false
	isShownMedia = false
	isShownFileCell = false
	isContracted = false
	isModal = false
	isLoader = true

	public inputSizeXL: InputSize = 'xl'
	public inputSizeL: InputSize = 'l'
	public inputSizeM: InputSize = 'm'
	public inputSizeS: InputSize = 's'

	selected: boolean = true

	form: FormGroup

	constructor(
		private fb: FormBuilder,
		private newShipmentModalService: NewShipmentModalService,
		private requestCreateSuccessModalService: RequestCreateSuccessModalService,
		private requestInfoModalService: RequestInfoModalService,
		private requestFailureModalService: RequestFailureModalService,
		private toaster: ToasterService
	) {}

	ngOnInit(): void {
		this.form = this.fb.group({
			testPlaceholder: [
				'',
				[Validators.required, Validators.minLength(3), Validators.maxLength(10)]
			],
			testPlaceholder2: [
				'',
				[Validators.required, Validators.minLength(3), Validators.maxLength(10)]
			],
			testPlaceholder3: [
				'',
				[Validators.required, Validators.minLength(3), Validators.maxLength(10)]
			]
		})

		this.lookIt()
	}

	showSuccessToaster() {
		console.log('halo toaster!!')
		this.toaster.show(
			'success',
			'Halo success!',
			'This is a success alert',
			6000
		)
	}

	showDefaultToaster() {
		console.log('halo toaster!!')
		this.toaster.show(
			'default',
			'Halo default!',
			'This is a default alert',
			6000
		)
	}

	showFailureToaster() {
		console.log('halo toaster!!')
		this.toaster.show(
			'failure',
			'Halo failure!',
			'This is a failure alert',
			6000
		)
	}

	lookIt() {
		// console.log(
		// 	'ERR>>>',
		// 	this.form.errors,
		// 	'VALID>>>',
		// 	this.form.valid,
		// 	'VALUE>>>',
		// 	this.form.value
		// )
	}

	openNewShipmentModal() {
		this.newShipmentModalService.open()
	}

	openRequestCreateSuccessModal() {
		this.requestCreateSuccessModalService.open()
	}

	openRequestInfoModal() {
		this.requestInfoModalService.open()
	}

	openRequestFailureModal() {
		this.requestFailureModalService.open()
	}
}
