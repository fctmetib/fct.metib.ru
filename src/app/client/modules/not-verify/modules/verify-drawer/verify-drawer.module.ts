import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {VerifyDrawerComponent} from './verify-drawer.component'
import {VerifyDrawerService} from './verify-drawer.service'

@NgModule({
	declarations: [VerifyDrawerComponent],
	imports: [CommonModule],
	providers: [VerifyDrawerService]
})
export class VerifyDrawerModule {}
