import {OrganizationService} from '../../../shared/services/share/organization.service'
import {DeliveryService} from '../../../shared/services/share/delivery.service'
import {FactoringComponent} from './components/cabinet-page/factoring/factoring.component'
import {ProgressSpinnerModule} from 'primeng/progressspinner'
import {CommonModule} from '@angular/common'
import {DropdownModule} from 'primeng/dropdown'
import {CardModule} from 'primeng/card'
import {ButtonModule} from 'primeng/button'
import {TableModule} from 'primeng/table'
import {MultiSelectModule} from 'primeng/multiselect'
import {ProgressBarModule} from 'primeng/progressbar'
import {SliderModule} from 'primeng/slider'
import {ChartModule} from 'primeng/chart'
import {NgModule} from '@angular/core'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {InputTextModule} from 'primeng/inputtext'
import {CheckboxModule} from 'primeng/checkbox'
import {RadioButtonModule} from 'primeng/radiobutton'
import {InputTextareaModule} from 'primeng/inputtextarea'
import {MenubarModule} from 'primeng/menubar'
import {AvatarModule} from 'primeng/avatar'
import {CabinetRoutingModule} from './cabinet-routing.module'
import {CabinetPageComponent} from './components/cabinet-page/cabinet-page.component'
import {ClientService} from 'src/app/shared/services/common/client.service'
import {SkeletonModule as SkeletonModule22} from 'primeng/skeleton'
import {StatisticsService} from './services/statistics.service'
import {WidgetStatsComponent} from './components/cabinet-page/widget-stats/widget-stats.component'
import {WidgetActionsComponent} from './components/cabinet-page/widget-actions/widget-actions.component'
import {WidgetNewsComponent} from './components/cabinet-page/widget-news/widget-news.component'
import {CabinetNewsService} from './services/news.service'
import {SpacingModule} from '../../../shared/ui-kit/spacing/spacing.module'
import {CashPanelModule} from '../../../shared/modules/cash-panel/cash-panel.module'
import {SkeletonModule} from 'src/app/shared/ui-kit/skeleton/skeleton.module'
import {RubModule} from 'src/app/shared/pipes/rub/rub.module'

@NgModule({
	imports: [
		CommonModule,
		InputTextModule,
		CheckboxModule,
		ButtonModule,
		RadioButtonModule,
		InputTextareaModule,
		SliderModule,
		TableModule,
		DropdownModule,
		FormsModule,
		SkeletonModule22,
		ProgressBarModule,
		MultiSelectModule,
		ReactiveFormsModule,
		ProgressSpinnerModule,
		CardModule,
		MenubarModule,
		AvatarModule,
		CabinetRoutingModule,
		ChartModule,
		SpacingModule,
		CashPanelModule,
		SkeletonModule,
		RubModule
	],
	declarations: [
		CabinetPageComponent,
		FactoringComponent,
		WidgetStatsComponent,
		WidgetActionsComponent,
		WidgetNewsComponent
	],
	providers: [
		ClientService,
		DeliveryService,
		OrganizationService,
		StatisticsService,
		CabinetNewsService
	]
})
export class CabinetModule {}
