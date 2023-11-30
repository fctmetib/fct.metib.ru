import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CheckboxComponent } from './checkbox.component'
import { RefIconModule } from '../ref-icon/ref-icon.module'

@NgModule({
	declarations: [CheckboxComponent],
	exports: [CheckboxComponent],
	imports: [CommonModule, RefIconModule]
})
export class CheckboxModule {}
