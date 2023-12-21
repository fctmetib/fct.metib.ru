import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RequestBrowserDrawerComponent} from './request-browser-drawer.component'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {MatDialogModule} from '@angular/material/dialog'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {TableModule} from 'src/app/shared/ui-kit/table/table.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {RefIconModule} from 'src/app/shared/ui-kit/ref-icon/ref-icon.module'
import {RequestBrowserDrawerService} from './request-browser-drawer.service'
import {TagModule} from 'src/app/shared/ui-kit/tag/tag.module'
import {CashPanelModule} from 'src/app/shared/modules/cash-panel/cash-panel.module'

@NgModule({
	declarations: [RequestBrowserDrawerComponent],
	imports: [
		CommonModule,
		DrawerModule,
		MatDialogModule,
		SpacingModule,
		TableModule,
		ButtonModule,
		RefIconModule,
		TagModule,
		CashPanelModule
	],
	providers: [RequestBrowserDrawerService]
})
export class RequestBrowserDrawerModule {}
