import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ContactPanelComponent} from './contact-panel.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {LinkModule} from 'src/app/shared/ui-kit/link/link.module'

@NgModule({
	declarations: [ContactPanelComponent],
	imports: [CommonModule, SpacingModule, LinkModule],
	exports: [ContactPanelComponent]
})
export class ContactPanelModule {}
