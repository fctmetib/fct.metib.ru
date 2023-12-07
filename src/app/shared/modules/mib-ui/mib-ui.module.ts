import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonModule } from '../../ui-kit/button/button.module'
import { InputModule } from '../../ui-kit/input/input.module'
import { MibUiComponent } from './mib-ui.component'
import { RefIconModule } from '../../ui-kit/ref-icon/ref-icon.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SpacingModule } from '../../ui-kit/spacing/spacing.module'
import { BadgeModule } from '../../ui-kit/badge/badge.module'
import { CheckboxModule } from '../../ui-kit/checkbox/checkbox.module'
import { TagModule } from '../../ui-kit/tag/tag.module'
import { RadioModule } from '../../ui-kit/radio/radio.module'
import { SwitchModule } from '../../ui-kit/switch/switch.module'
import { HeaderModule } from '../header/header.module'

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ButtonModule,
		RefIconModule,
		InputModule,
		SpacingModule,
		BadgeModule,
		CheckboxModule,
		TagModule,
		RadioModule,
		SwitchModule,
		HeaderModule
	],
	declarations: [MibUiComponent]
})
export class MibUiModule {}
