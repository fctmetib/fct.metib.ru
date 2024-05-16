import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {NotVerifyRoutingModule} from './not-verify-routing.module'
import {NotVerifyComponent} from './pages/not-verify/not-verify.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {RequestCardModule} from 'src/app/shared/modules/request-card/request-card.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {VerifyDrawerModule} from './modules/verify-query-drawer/verify-drawer.module'
import {VerifyDrawerService} from './modules/verify-query-drawer/verify-drawer.service'
import {RequestDrawerService} from './modules/verify-request-drawer/request-drawer.service'

@NgModule({
	declarations: [NotVerifyComponent],
	imports: [
		CommonModule,
		SpacingModule,
		RequestCardModule,
		ButtonModule,
		NotVerifyRoutingModule,
		VerifyDrawerModule
	],
	providers: [VerifyDrawerService, RequestDrawerService]
})
export class NotVerifyModule {}
