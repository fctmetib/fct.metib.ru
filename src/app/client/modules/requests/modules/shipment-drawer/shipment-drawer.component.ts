import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {FormsPresetsService} from '../../../../../shared/services/forms-presets.service'
import {Shipment} from './interfaces/shipment.interface'
import {ToolsService} from '../../../../../shared/services/tools.service'
import {RequestRes} from '../../interfaces/request.interface'
import {tap} from 'rxjs'
import {ShipmentDrawerService} from './services/shipment-drawer.service'

@Component({
	selector: 'mib-delivery-agreement-drawer',
	templateUrl: './shipment-drawer.component.html',
	styleUrls: ['./shipment-drawer.component.scss']
})
export class ShipmentDrawerComponent implements OnInit {
	public form: FormGroup

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: DrawerData<RequestRes[]>,
		public dialogRef: MatDialogRef<ShipmentDrawerComponent>,
		private fb: FormBuilder,
		private formsPresetsService: FormsPresetsService,
		private shipmentDrawerService: ShipmentDrawerService,
		private toolsService: ToolsService
	) {}

	get WaybillNumber() {
		return this.form.get('WaybillNumber')
	}

	get InvoiceNumber() {
		return this.form.get('InvoiceNumber')
	}

	get WaybillDate() {
		return this.form.get('WaybillDate')
	}

	get InvoiceDate() {
		return this.form.get('InvoiceDate')
	}

	ngOnInit() {
		this.initForm()
		this.watchForms()
	}

	private watchForms() {
		this.WaybillNumber.valueChanges
			.pipe(
				tap(value => {
					this.InvoiceNumber.setValue(value)
				})
			)
			.subscribe()

		this.WaybillDate.valueChanges
			.pipe(
				tap(value => {
					this.InvoiceDate.setValue(value)
				})
			)
			.subscribe()

		this.form.valueChanges
			.pipe(
				tap(form => {
					console.log('form', form)
				})
			)
			.subscribe()
	}

	private initForm() {
		this.form = this.formsPresetsService.shipment(Validators.required)
	}

	onSubmit() {
		const form: Shipment = this.toolsService.transformDatesToISO(
			this.form.getRawValue()
		)
		this.shipmentDrawerService.emitShipment(form)
		this.form.reset()
	}

	onSubmitAndClose() {
		this.onSubmit()
		this.dialogRef.close()
	}
}
