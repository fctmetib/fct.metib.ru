import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {AccordionWithShadowComponent} from './accordion-with-shadow.component'
import {SpacingModule} from '../spacing/spacing.module'
import {IconModule} from '../ref-icon/icon.module'

@NgModule({
	declarations: [AccordionWithShadowComponent],
	imports: [CommonModule, SpacingModule, IconModule],
	exports: [AccordionWithShadowComponent]
})
export class AccordionWithShadowModule {}
