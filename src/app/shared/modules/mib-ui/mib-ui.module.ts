import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonModule } from '../../ui-kit/button/button.module'
import { MibUiComponent } from './mib-ui.component'
import { RefIconModule } from '../../ui-kit/ref-icon/ref-icon.module'

@NgModule({
	imports: [CommonModule, ButtonModule, RefIconModule],
	declarations: [MibUiComponent]
})
export class MibUiModule {}
