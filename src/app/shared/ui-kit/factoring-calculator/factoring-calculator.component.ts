import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup} from '@angular/forms'

@Component({
	selector: 'mib-factoring-calculator',
	templateUrl: './factoring-calculator.component.html',
	styleUrls: ['./factoring-calculator.component.scss']
})
export class FactoringCalculatorComponent implements OnInit {
	form: FormGroup
	result: number = 0

	constructor(private fb: FormBuilder) {}

	ngOnInit() {
		this.form = this.fb.group({
			finAmountNumber: [11800000],
			finAmountRange: [11800000],
			monthlyTurnoverNumber: [15000000],
			monthlyTurnoverRange: [15000000],
			defermentPeriodNumber: [49],
			defermentPeriodRange: [49]
		})

		this.form.valueChanges.subscribe(() => this.calculate())

		this.syncInputs('finAmount')
		this.syncInputs('monthlyTurnover')
		this.syncInputs('defermentPeriod')

		this.updateRangeBackground('finAmount')
		this.updateRangeBackground('monthlyTurnover')
		this.updateRangeBackground('defermentPeriod')

		this.calculate()
	}

	syncInputs(controlPrefix: string) {
		const numberControl = this.form.get(`${controlPrefix}Number`)
		const rangeControl = this.form.get(`${controlPrefix}Range`)

		numberControl?.valueChanges.subscribe(value => {
			if (rangeControl?.value !== value) {
				rangeControl?.setValue(value, {emitEvent: false})
			}
			this.updateRangeBackground(controlPrefix)
		})

		rangeControl?.valueChanges.subscribe(value => {
			if (numberControl?.value !== value) {
				numberControl?.setValue(value, {emitEvent: false})
			}
			this.updateRangeBackground(controlPrefix)
		})
	}

	calculate() {
		const finAmount = this.form.get('finAmountNumber')?.value
		const monthlyTurnover = this.form.get('monthlyTurnoverNumber')?.value
		const defermentPeriod = this.form.get('defermentPeriodNumber')?.value

		let effectiveRate: number

		if (monthlyTurnover <= 10000000) {
			effectiveRate = 19.4
		} else if (monthlyTurnover >= 10000000 && monthlyTurnover <= 49999999) {
			effectiveRate = 21
		} else {
			effectiveRate = 23.65
		}

		const dailyRate = effectiveRate / 365
		const calculatedResult = dailyRate * 0.8 * defermentPeriod
		this.result = +Math.min(calculatedResult, 100).toFixed(2)
	}

	updateRangeBackground(controlPrefix: string) {
		const rangeControl = this.form.get(`${controlPrefix}Range`)
		const rangeInput = document.getElementById(
			`${controlPrefix}Range`
		) as HTMLInputElement
		if (rangeInput) {
			const max = rangeInput.max ? +rangeInput.max : 100
			const value = Math.min(rangeControl?.value, max)
			const percentage = (value / max) * 100
			rangeInput.style.setProperty(
				'--range-thumb-position',
				`${Math.ceil(percentage)}%`
			)
		}
	}
}
