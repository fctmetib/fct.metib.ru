import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ContractedFormsComponent} from './contracted-forms.component'
import {SpacingModule} from '../spacing/spacing.module'
import {ButtonModule} from '../button/button.module'
import {BadgeModule} from '../badge/badge.module'
import {IconModule} from '../ref-icon/icon.module'

@NgModule({
	declarations: [ContractedFormsComponent],
	exports: [ContractedFormsComponent],
	imports: [
		CommonModule,
		SpacingModule,
		ButtonModule,
		BadgeModule,
		IconModule
	]
})
export class ContractedFormsModule {}
