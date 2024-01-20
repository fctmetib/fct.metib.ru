import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {NewContractsPageDrawerComponent} from './new-contracts-page-drawer.component'
import {NewContractsPageDrawerService} from './new-contracts-page-drawer.service'

@NgModule({
	declarations: [NewContractsPageDrawerComponent],
	imports: [CommonModule],
	providers: [NewContractsPageDrawerService]
})
export class NewContractsPageDrawerModule {}
