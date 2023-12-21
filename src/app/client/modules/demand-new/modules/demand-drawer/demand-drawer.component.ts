import {Component, Inject, OnInit} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { ButtonSize } from 'src/app/shared/ui-kit/button/interfaces/button.interface'
import { InputSize } from 'src/app/shared/ui-kit/input/interfaces/input.interface'
import {DrawerData} from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface';

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
		public dialogRef: MatDialogRef<DemandDrawerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DrawerData
	) {}

	ngOnInit(): void {
		this.initForms()
	}

	initForms() {
		this.form = this.fb.group({})
	}
}
