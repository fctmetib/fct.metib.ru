import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BadgeComponent } from './badge.component'
import { RefIconModule } from '../ref-icon/ref-icon.module'

@NgModule({
	declarations: [BadgeComponent],
	exports: [BadgeComponent],
	imports: [CommonModule, RefIconModule]
})
export class BadgeModule {}
