import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RadioComponent } from './radio.component'
import { RefIconModule } from '../ref-icon/ref-icon.module'

@NgModule({
	declarations: [RadioComponent],
	exports: [RadioComponent],
	imports: [CommonModule, RefIconModule]
})
export class RadioModule {}
