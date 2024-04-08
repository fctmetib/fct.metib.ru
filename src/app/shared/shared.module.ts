import {ProgressBarModule} from 'primeng/progressbar'
import {NgModule} from '@angular/core'
import {HeaderPageComponent} from './components/header-page/header-page.component'
import {MibFileUploaderComponent} from './components/mib-file-uploader/mib-file-uploader.component'
import {CommonModule} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MibFileErrorDialogComponent} from './components/mib-file-error-dialog/mib-file-error-dialog.component'
import {AuthService} from '../auth/services/auth.service'
import {MibUiModule} from './modules/mib-ui/mib-ui.module'

@NgModule({
	imports: [
		CommonModule,
		ProgressBarModule,
		FormsModule,
		ReactiveFormsModule,
		MibUiModule
	],
	exports: [
		HeaderPageComponent,
		MibFileUploaderComponent,
		MibFileErrorDialogComponent
	],
	declarations: [
		HeaderPageComponent,
		MibFileUploaderComponent,
		MibFileErrorDialogComponent
	],
	providers: [AuthService]
})
export class SharedModule {}
