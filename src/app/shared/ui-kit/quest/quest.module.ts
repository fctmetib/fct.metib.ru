import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {QuestComponent} from './quest.component'
import {SpacingModule} from '../spacing/spacing.module'
import {IconModule} from '../ref-icon/icon.module'
import {ButtonModule} from '../button/button.module'
import {RightIconModule} from '../../directives/right-icon/right-icon.module'
import {CheckboxModule} from '../checkbox/checkbox.module'
import {ReactiveFormsModule} from '@angular/forms'
import {InputModule} from '../input/input.module'
import {LabelModule} from '../../directives/label/label.module'

@NgModule({
	declarations: [QuestComponent],
	imports: [
		CommonModule,
		SpacingModule,
		IconModule,
		CheckboxModule,
		ButtonModule,
		RightIconModule,
		ReactiveFormsModule,
		InputModule,
		LabelModule
	],
	exports: [QuestComponent]
})
export class QuestModule {}
