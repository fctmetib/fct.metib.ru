import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ContractedFormsComponent} from './contracted-forms.component'
import {SpacingModule} from '../spacing/spacing.module'
import {ButtonModule} from '../button/button.module'
import {BadgeModule} from '../badge/badge.module'
import {RefIconModule} from '../ref-icon/ref-icon.module'

@NgModule({
	declarations: [ContractedFormsComponent],
	exports: [ContractedFormsComponent],
	imports: [
		CommonModule,
		SpacingModule,
		ButtonModule,
		BadgeModule,
		RefIconModule
	]
})
export class ContractedFormsModule {}
