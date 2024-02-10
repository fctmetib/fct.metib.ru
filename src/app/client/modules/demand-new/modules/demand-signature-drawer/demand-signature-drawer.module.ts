import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DemandSignatureDrawerComponent} from './demand-signature-drawer.component'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {DemandSignatureDrawerService} from './demand-signature-drawer.service'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'

@NgModule({
	declarations: [DemandSignatureDrawerComponent],
	imports: [CommonModule, DrawerModule, SpacingModule],
	providers: [DemandSignatureDrawerService]
})
export class DemandSignatureDrawerModule {}
