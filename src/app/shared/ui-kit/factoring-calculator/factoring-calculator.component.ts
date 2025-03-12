import {isPlatformBrowser} from '@angular/common'
import {
	Component,
	EventEmitter,
	Inject,
	OnInit,
	Output,
	PLATFORM_ID
} from '@angular/core'
import {FormBuilder, FormGroup} from '@angular/forms'

@Component({
	selector: 'mib-factoring-calculator',
	templateUrl: './factoring-calculator.component.html',
	styleUrls: ['./factoring-calculator.component.scss']
})
export class FactoringCalculatorComponent implements OnInit {
	form: FormGroup
	result: number = 0

	@Output() onPress = new EventEmitter()

	constructor(
		private fb: FormBuilder,
		@Inject(PLATFORM_ID) private platformId: Object
	) {}

	ngOnInit() {
		this.form = this.fb.group({
			finAmountNumber: [1400000],
			finAmountRange: [1400000],
			monthlyTurnoverNumber: [15000000],
			monthlyTurnoverRange: [15000000],
			defermentPeriodNumber: [49],
			defermentPeriodRange: [49]
		})

		this.form.valueChanges.subscribe(() => this.calculate())

		this.syncInputs('finAmount')
		this.syncInputs('monthlyTurnover')
		this.syncInputs('defermentPeriod')

		if (isPlatformBrowser(this.platformId)) {
			this.updateRangeBackground('finAmount')
			this.updateRangeBackground('monthlyTurnover')
			this.updateRangeBackground('defermentPeriod')
		}

		this.calculate()
	}

	syncInputs(controlPrefix: string) {
		const numberControl = this.form.get(`${controlPrefix}Number`)
		const rangeControl = this.form.get(`${controlPrefix}Range`)

		numberControl?.valueChanges.subscribe(value => {
			if (rangeControl?.value !== value) {
				rangeControl?.setValue(value, {emitEvent: false})
			}
			if (isPlatformBrowser(this.platformId)) {
				this.updateRangeBackground(controlPrefix)
			}
		})

		rangeControl?.valueChanges.subscribe(value => {
			if (numberControl?.value !== value) {
				numberControl?.setValue(value, {emitEvent: false})
			}
			if (isPlatformBrowser(this.platformId)) {
				this.updateRangeBackground(controlPrefix)
			}
		})
	}

	calculate() {
		const finAmount = this.form.get('finAmountNumber')?.value
		const monthlyTurnover = this.form.get('monthlyTurnoverNumber')?.value
		const defermentPeriod = this.form.get('defermentPeriodNumber')?.value

		let effectiveRate: number

		if (monthlyTurnover > 50000000) {
			effectiveRate = 25.85;
		} else if (monthlyTurnover >= 10000000 && monthlyTurnover <= 49999999) {
			effectiveRate = 27.85;
		} else {
			effectiveRate = 30.65;
		}		

		const dailyRate = effectiveRate / 365
		const calculatedResult = dailyRate * 0.8 * defermentPeriod
		this.result = +Math.min(calculatedResult, 100).toFixed(2)
	}

	updateRangeBackground(controlPrefix: string) {
		if (!isPlatformBrowser(this.platformId)) return

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

	getLabel(number, label) {
		const cases = [2, 0, 1, 1, 1, 2]
		return `${
			label[
				number % 100 > 4 && number % 100 < 20
					? 2
					: cases[number % 10 < 5 ? number % 10 : 5]
			]
		}`
	}
}
