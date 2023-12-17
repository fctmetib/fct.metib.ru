import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ToasterComponent } from './toaster.component'
import { RefIconModule } from '../ref-icon/ref-icon.module'

@NgModule({
	declarations: [ToasterComponent],
	exports: [ToasterComponent],
	imports: [CommonModule, RefIconModule]
})
export class ToasterModule {}
