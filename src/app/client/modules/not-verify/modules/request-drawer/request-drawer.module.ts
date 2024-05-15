import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RequestDrawerComponent} from './request-drawer.component'
import {RequestDrawerService} from './request-drawer.service'

@NgModule({
	declarations: [RequestDrawerComponent],
	imports: [CommonModule],
	providers: [RequestDrawerService]
})
export class RequestDrawerModule {}
