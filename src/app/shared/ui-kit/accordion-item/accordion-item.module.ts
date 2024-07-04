import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {AccordionItemComponent} from './accordion-item.component'
import {SpacingModule} from '../spacing/spacing.module'
import {IconModule} from '../ref-icon/icon.module'

@NgModule({
	declarations: [AccordionItemComponent],
	imports: [CommonModule, SpacingModule, IconModule],
	exports: [AccordionItemComponent]
})
export class AccordionItemModule {}
