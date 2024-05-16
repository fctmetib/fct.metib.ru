import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {VerifyQueryDrawerComponent} from './verify-query-drawer.component'
import {VerifyDrawerService} from './verify-drawer.service'

@NgModule({
	declarations: [VerifyQueryDrawerComponent],
	imports: [CommonModule],
	providers: [VerifyDrawerService]
})
export class VerifyDrawerModule {}
