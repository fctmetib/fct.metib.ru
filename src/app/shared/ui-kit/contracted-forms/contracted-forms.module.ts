import {NgModule} from '@angular/core'
import {CommonModule, DatePipe} from '@angular/common'
import {ContractedFormsComponent} from './contracted-forms.component'
import {SpacingModule} from '../spacing/spacing.module'
import {ButtonModule} from '../button/button.module'
import {BadgeModule} from '../badge/badge.module'
import {IconModule} from '../ref-icon/icon.module'
import {RubPipe} from '../../pipes/rub/rub.pipe'

@NgModule({
	declarations: [ContractedFormsComponent],
	exports: [ContractedFormsComponent],
	imports: [CommonModule, SpacingModule, ButtonModule, BadgeModule, IconModule],
	providers: [DatePipe, RubPipe]
})
export class ContractedFormsModule {}
