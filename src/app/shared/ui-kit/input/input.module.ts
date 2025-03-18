import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {InputComponent} from './input.component'
import {IconModule} from '../ref-icon/icon.module'
import {MibInputDirective} from './directives/mib-input.directive'
import {AutocompleteComponent} from './components/autocomplete.component'
import {BaseInputDirective} from './directives/base-input.directive'
import {InputBaseWrapperComponent} from './components/input-base-wrapper/input-base-wrapper.component'
import {AutoUnsubscribeService} from '../../services/auto-unsubscribe.service'
import {ReactiveFormsModule} from '@angular/forms'
import {LabelModule} from '../../directives/label/label.module'
import {RightIconModule} from '../../directives/right-icon/right-icon.module'
import { LeftIconModule } from '../../directives/left-icon/left-icon.module';

@NgModule({
	declarations: [
		InputComponent,
		MibInputDirective,
		AutocompleteComponent,
		BaseInputDirective,
		InputBaseWrapperComponent
	],
	imports: [
		CommonModule,
		IconModule,
		ReactiveFormsModule,
		LabelModule,
		RightIconModule,
		LeftIconModule
	],
	providers: [AutoUnsubscribeService],
	exports: [
		InputComponent,
		AutocompleteComponent,
		MibInputDirective,
		InputBaseWrapperComponent
	]
})
export class InputModule {}
