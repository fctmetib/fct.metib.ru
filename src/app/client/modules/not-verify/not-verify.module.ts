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
import { TabModule } from '../../../shared/ui-kit/tab/tab.module';
import { NavbarModule } from '../../../shared/ui-kit/navbar/navbar.module';
import { BadgeModule } from '../../../shared/ui-kit/badge/badge.module';
import { IconModule } from '../../../shared/ui-kit/ref-icon/icon.module';
import { PaginatorModule } from '../../../shared/ui-kit/paginator/paginator.module';
import { SkeletonModule } from '../../../shared/ui-kit/skeleton/skeleton.module';
import { TableModule } from '../../../shared/ui-kit/table/table.module';
import { AvatarModule } from '../../../shared/ui-kit/avatar/avatar.module';
import { DropdownModule } from '../../../shared/ui-kit/dropdown/dropdown.module';
import { DropdownPointModule } from '../../../shared/ui-kit/dropdown-point/dropdown-point.module';
import { SelectModule } from '../../../shared/ui-kit/select/select.module';

@NgModule({
	declarations: [NotVerifyComponent],
  imports: [
    CommonModule,
    SpacingModule,
    RequestCardModule,
    ButtonModule,
    NotVerifyRoutingModule,
    VerifyDrawerModule,
    TabModule,
    NavbarModule,
    BadgeModule,
    IconModule,
    PaginatorModule,
    SkeletonModule,
    TableModule,
    AvatarModule,
    DropdownModule,
    DropdownPointModule,
    SelectModule
  ],
	providers: [VerifyDrawerService, RequestDrawerService]
})
export class NotVerifyModule {}
