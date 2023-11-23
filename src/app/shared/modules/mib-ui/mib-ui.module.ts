import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonModule } from '../../ui-kit/button/button.module'
import { InputModule } from '../../ui-kit/input/input.module'
import { MibUiComponent } from './mib-ui.component'
import { RefIconModule } from '../../ui-kit/ref-icon/ref-icon.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ButtonModule,
		RefIconModule,
		InputModule
	],
	declarations: [MibUiComponent]
})
export class MibUiModule {}
