import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RequestDrawerComponent} from './request-drawer.component'
import {DrawerModule} from '../../../../../shared/ui-kit/drawer/drawer.module'
import {MatDialogModule} from '@angular/material/dialog'
import {SpacingModule} from '../../../../../shared/ui-kit/spacing/spacing.module'
import {TableModule} from '../../../../../shared/ui-kit/table/table.module'
import {ButtonModule} from '../../../../../shared/ui-kit/button/button.module'
import {IconModule} from '../../../../../shared/ui-kit/ref-icon/icon.module'
import {SelectModule} from '../../../../../shared/ui-kit/select/select.module'
import {DropdownPointModule} from '../../../../../shared/ui-kit/dropdown-point/dropdown-point.module'
import {ReactiveFormsModule} from '@angular/forms'
import {CheckboxModule} from '../../../../../shared/ui-kit/checkbox/checkbox.module'
import {PaginatorModule} from '../../../../../shared/ui-kit/paginator/paginator.module'
import {RequestDrawerService} from './request-drawer.service'
import {InputModule} from '../../../../../shared/ui-kit/input/input.module'
import {MibDragAndDropModule} from '../../../../../shared/ui-kit/drag-and-drop/mib-drag-and-drop.module'
import {InformationModule} from '../../../../../shared/ui-kit/information/information.module'
import {ShipmentDrawerModule} from '../shipment-drawer/shipment-drawer.module'
import {DeliveryService} from '../shipment-drawer/services/delivery.service'
import {RubModule} from '../../../../../shared/pipes/rub/rub.module'
import {DropdownModule} from '../../../../../shared/ui-kit/dropdown/dropdown.module'
import {RightIconModule} from '../../../../../shared/directives/right-icon/right-icon.module'
import {RequestCorrectionModalService} from '../../../../../shared/modules/modals/request-correction-modal/request-correction-modal.service'
import {RequestCorrectionModalModule} from '../../../../../shared/modules/modals/request-correction-modal/request-correction-modal.module'
import {LabelModule} from '../../../../../shared/directives/label/label.module'
import {NgxMaskModule} from 'ngx-mask'
import {AutoCompleteModule} from '../../../../../shared/ui-kit/auto-complete/auto-complete.module'
import {SkeletonModule} from 'src/app/shared/ui-kit/skeleton/skeleton.module'
import {BreadcrumbModule} from 'src/app/shared/ui-kit/breadcrumb/breadcrumb.module'

@NgModule({
	declarations: [RequestDrawerComponent],
	imports: [
		CommonModule,
		DrawerModule,
		MatDialogModule,
		SpacingModule,
		TableModule,
		ButtonModule,
		IconModule,
		SelectModule,
		DropdownPointModule,
		ReactiveFormsModule,
		CheckboxModule,
		PaginatorModule,
		InputModule,
		MibDragAndDropModule,
		InformationModule,
		ShipmentDrawerModule,
		RubModule,
		DropdownModule,
		RightIconModule,
		RequestCorrectionModalModule,
		LabelModule,
		NgxMaskModule,
		AutoCompleteModule,
		SkeletonModule,
		BreadcrumbModule
	],
	providers: [
		RequestDrawerService,
		DeliveryService,
		RequestCorrectionModalService
	]
})
export class RequestDrawerModule {}
