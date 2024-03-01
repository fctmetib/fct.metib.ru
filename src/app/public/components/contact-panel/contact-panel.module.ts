import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ContactPanelComponent} from './contact-panel.component'

@NgModule({
	declarations: [ContactPanelComponent],
	imports: [CommonModule],
	exports: [ContactPanelComponent]
})
export class ContactPanelModule {}
