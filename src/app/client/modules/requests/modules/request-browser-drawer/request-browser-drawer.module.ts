import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RequestBrowserDrawerComponent } from './request-browser-drawer.component'

@NgModule({
	declarations: [RequestBrowserDrawerComponent],
	exports: [RequestBrowserDrawerComponent],
	imports: [CommonModule],
	providers: [RequestBrowserDrawerModule]
})
export class RequestBrowserDrawerModule {}
