import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ContractedFormsComponent} from './contracted-forms.component'

@NgModule({
	declarations: [ContractedFormsComponent],
	exports: [ContractedFormsComponent],
	imports: [CommonModule]
})
export class ContractedFormsModule {}
