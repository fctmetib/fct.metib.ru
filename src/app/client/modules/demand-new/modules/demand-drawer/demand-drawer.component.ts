import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
import { ButtonSize } from 'src/app/shared/ui-kit/button/interfaces/button.interface'
import { InputSize } from 'src/app/shared/ui-kit/input/interfaces/input.interface'

@Component({
	selector: 'mib-demand-drawer',
	templateUrl: './demand-drawer.component.html',
	styleUrls: ['./demand-drawer.component.scss']
})
export class DemandDrawerComponent implements OnInit {
	public form: FormGroup

	public size: InputSize | ButtonSize = 'm'

	constructor(
		private fb: FormBuilder,
		public dialogRef: MatDialogRef<DemandDrawerComponent>
	) {}

	ngOnInit(): void {
		this.initForms()
	}

	initForms() {
		this.form = this.fb.group({})
	}
}
