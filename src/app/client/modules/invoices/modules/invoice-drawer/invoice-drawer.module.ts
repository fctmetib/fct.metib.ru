import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {InvoiceDrawerComponent} from './invoice-drawer.component'
import {InvoiceDrawerService} from './invoice-drawer.service'

@NgModule({
	declarations: [InvoiceDrawerComponent],
	imports: [CommonModule],
	providers: [InvoiceDrawerService]
})
export class InvoiceDrawerModule {}
