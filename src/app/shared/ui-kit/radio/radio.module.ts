import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RadioComponent} from './radio.component'
import {RefIconModule} from '../ref-icon/ref-icon.module'
import {RadioGroupComponent} from './components/radio-group.component'
import {ReactiveFormsModule} from '@angular/forms'

@NgModule({
	declarations: [RadioComponent, RadioGroupComponent],
	exports: [RadioComponent],
	imports: [CommonModule, RefIconModule, ReactiveFormsModule]
})
export class RadioModule {}
