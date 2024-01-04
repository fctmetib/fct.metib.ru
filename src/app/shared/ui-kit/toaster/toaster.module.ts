import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ToasterComponent } from './toaster.component'
import { IconModule } from '../ref-icon/icon.module'

@NgModule({
	declarations: [ToasterComponent],
	exports: [ToasterComponent],
	imports: [CommonModule, IconModule]
})
export class ToasterModule {}
