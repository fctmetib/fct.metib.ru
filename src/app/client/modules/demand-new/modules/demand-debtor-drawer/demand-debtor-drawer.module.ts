import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DemandDebtorDrawerComponent} from './demand-debtor-drawer.component'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {DemandDebtorDrawerService} from './demand-debtor-drawer.service'

@NgModule({
	declarations: [DemandDebtorDrawerComponent],
	imports: [CommonModule, DrawerModule, SpacingModule],
	providers: [DemandDebtorDrawerService]
})
export class DemandDebtorDrawerModule {}
