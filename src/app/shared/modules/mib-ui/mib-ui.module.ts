import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonModule } from '../../ui-kit/button/button.module'
import { MibUiComponent } from './mib-ui.component'

@NgModule({
	imports: [CommonModule, ButtonModule],
	declarations: [MibUiComponent]
})
export class MibUiModule {}
