import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BadgeComponent } from './badge.component'
import { IconModule } from '../ref-icon/icon.module'

@NgModule({
	declarations: [BadgeComponent],
	exports: [BadgeComponent],
	imports: [CommonModule, IconModule]
})
export class BadgeModule {}
