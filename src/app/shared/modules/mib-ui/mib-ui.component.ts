import { Component, OnInit } from '@angular/core'
import { InputSize } from '../../ui-kit/input/interfaces/input.interface'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
	selector: 'app-mib-ui',
	templateUrl: './mib-ui.component.html',
	styles: [
		`
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
	isShownHeader = true
	public inputSizeXL: InputSize = 'xl'
	public inputSizeL: InputSize = 'l'
	public inputSizeM: InputSize = 'm'
	public inputSizeS: InputSize = 's'

	selected: boolean = true

	form: FormGroup

	constructor(private fb: FormBuilder) {}

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

	lookIt() {
		console.log(
			'ERR>>>',
			this.form.errors,
			'VALID>>>',
			this.form.valid,
			'VALUE>>>',
			this.form.value
		)
	}
}
