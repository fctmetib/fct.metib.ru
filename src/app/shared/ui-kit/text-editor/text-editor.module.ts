import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {IconModule} from '../ref-icon/icon.module'
import {AutoUnsubscribeService} from '../../services/auto-unsubscribe.service'
import {ReactiveFormsModule} from '@angular/forms'
import {LabelModule} from '../../directives/label/label.module'
import {RightIconModule} from '../../directives/right-icon/right-icon.module'
import { TextEditorComponent } from './text-editor.component'

@NgModule({
	declarations: [
		TextEditorComponent,
	],
	imports: [
		CommonModule,
		IconModule,
		ReactiveFormsModule,
		LabelModule,
		RightIconModule
	],
	providers: [AutoUnsubscribeService],
	exports: [
		TextEditorComponent
	]
})
export class TextEditorModule {}
