import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FactoringCalculatorComponent} from './factoring-calculator.component'
import {SpacingModule} from '../spacing/spacing.module'
import {ButtonModule} from '../button/button.module'
import {InputModule} from '../input/input.module'
import {LabelModule} from '../../directives/label/label.module'

@NgModule({
	declarations: [FactoringCalculatorComponent],
	imports: [
		CommonModule,
		SpacingModule,
		ButtonModule,
		InputModule,
		LabelModule
	],
	exports: [FactoringCalculatorComponent]
})
export class FactoringCalculatorModule {}
