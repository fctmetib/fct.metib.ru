import {MibSliderPartnersComponent} from './shared/mib-slider-partners/mib-slider-partners.component'
import {ContactsComponent} from './pages/contacts/contacts.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {HomeComponent} from './pages/home/home.component'
import {UIKitTestComponent} from './shared/ui-kit-test/ui-kit-test.component'
import {MibMenuComponent} from './shared/menu/mib-menu/mib-menu.component'
import {MibCardInfoComponent} from './shared/cards/card-info/mib-card-info.component'
import {TariffsComponent} from './pages/tariffs/tariffs.component'
import {ClientsComponent} from './pages/clients/clients.component'
import {MibFooterComponent} from './shared/mib-footer/mib-footer.component'
import {MibModalModule} from './shared/mib-modal'
import {MibTabModule} from './shared/mib-tab'
import {MibScrollDirective} from './shared/directives/mib-scroll.directive'
import {MibSliderComponent} from './shared/mib-slider/mib-slider.component'
import {MibCardNewsComponent} from './shared/cards/card-news/mib-card-news.component'
import {PublicComponent} from './public.component'
import {MibSectionHeaderComponent} from './shared/mib-sections/mib-section-header/mib-section-header.component'
import {NewsComponent} from './pages/news/news.component'
import {MibSectionBodyComponent} from './shared/mib-sections/mib-section-body/mib-section-body.component'
import {MibCardTariffComponent} from './shared/cards/card-tariff/mib-card-tariff.component'
import {MibCardPersonComponent} from './shared/cards/card-person/mib-card-person.component'
import {OrganizationService} from './service/organization.service'
import {NewsService} from './service/news.service'
import {MibSectionHeaderNewsComponent} from './shared/mib-sections/mib-section-header-news/mib-section-header-news.component'
import {IConfig, NgxMaskModule} from 'ngx-mask'
import {InputMaskModule} from 'primeng/inputmask'
import {DialogModule} from 'primeng/dialog'
import {CheckboxModule as CheckboxModule22} from 'primeng/checkbox'
import {CarouselModule} from 'primeng/carousel'
import {MibSliderNewsComponent} from './shared/mib-slider-news/mib-slider-news.component'
import {ButtonModule} from '../shared/ui-kit/button/button.module'
import {HeaderModule} from '../shared/modules/header/header.module'
import {SpacingModule} from '../shared/ui-kit/spacing/spacing.module'
import {LandingComponent} from './pages/landing/landing.component'
import {IconModule} from '../shared/ui-kit/ref-icon/icon.module'
import {AdvantagesIconModule} from './components/advantages-icon/advantages-icon.module'
import {NavbarModule} from '../shared/ui-kit/navbar/navbar.module'
import {TabModule} from '../shared/ui-kit/tab/tab.module'
import {ContactPanelModule} from './components/contact-panel/contact-panel.module'
import {NewFooterModule} from '../shared/modules/new-footer/new-footer.module'
import {DropdownPointModule} from '../shared/ui-kit/dropdown-point/dropdown-point.module'
import {NewsPanelModule} from './components/news-panel/news-panel.module'
import {SingleNewsComponent} from './pages/single-news/single-news.component'
import {TagModule} from '../shared/ui-kit/tag/tag.module'
import {CounterModule} from './components/counter/counter.module'
import {LinkModule} from '../shared/ui-kit/link/link.module'
import {PartnerPanelModule} from './components/partner-panel/partner-panel.module'
import {LabelModule} from '../shared/directives/label/label.module'
import {InputModule} from '../shared/ui-kit/input/input.module'
import {TagsGroupModule} from '../shared/ui-kit/tags-group/tags-group.module'
import {SkeletonModule} from '../shared/ui-kit/skeleton/skeleton.module'
import {SwipeTextSliderModule} from './components/swipe-text-slider/swipe-text-slider.module'
import {LeftIconModule} from '../shared/directives/left-icon/left-icon.module'
import {AccordionItemModule} from '../shared/ui-kit/accordion-item/accordion-item.module'
import {FactoringCalculatorModule} from '../shared/ui-kit/factoring-calculator/factoring-calculator.module'
import {RateCardModule} from '../shared/ui-kit/rate-card/rate-card.module'
import {BadgeModule} from '../shared/ui-kit/badge/badge.module'
import {RightIconModule} from '../shared/directives/right-icon/right-icon.module'
import {BreadcrumbModule} from '../shared/ui-kit/breadcrumb/breadcrumb.module'
import {LandingRequestModalModule} from '../shared/modules/modals/landing-request-modal/landing-request-modal.module'
import {TextareaModule} from '../shared/ui-kit/textarea/textarea.module'
import {AutosizeModule} from 'ngx-autosize'
import {CheckboxModule} from '../shared/ui-kit/checkbox/checkbox.module'
import {LandingAgreementModalModule} from '../shared/modules/modals/landing-agreement-modal/landing-agreement-modal.module'
import {QuestModule} from '../shared/ui-kit/quest/quest.module'

const routes = [
	{
		path: '',
		component: PublicComponent,
		children: [
			{
				path: '',
				component: LandingComponent,
				title: 'Факторинг | Металлинвест Банк'
			},
			{
				path: 'tariffs',
				component: TariffsComponent,
				title: 'Тарифы'
			},
			{
				path: 'clients',
				component: ClientsComponent,
				title: 'Клиентам'
			},
			{
				path: 'contacts',
				component: ContactsComponent,
				title: 'Контакты'
			},
			{
				path: 'news',
				component: NewsComponent,
				title: 'Новости'
			},
			{
				path: 'news/:id',
				component: SingleNewsComponent
			},
			{
				path: 'ui-kit-test',
				component: UIKitTestComponent
			}
		]
	}
]

const maskConfigFunction: () => Partial<IConfig> = () => {
	return {
		validation: false
	}
}

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild(routes),
		InputMaskModule,
		NgxMaskModule.forRoot(maskConfigFunction),
		MibModalModule,
		DialogModule,
		MibTabModule,
		CarouselModule,
		CheckboxModule22,
		ButtonModule,
		HeaderModule,
		SpacingModule,
		IconModule,
		AdvantagesIconModule,
		TabModule,
		NavbarModule,
		ContactPanelModule,
		NewFooterModule,
		DropdownPointModule,
		NewsPanelModule,
		TagModule,
		CounterModule,
		LinkModule,
		PartnerPanelModule,
		InputModule,
		LabelModule,
		TagsGroupModule,
		SkeletonModule,
		SwipeTextSliderModule,
		AccordionItemModule,
		FactoringCalculatorModule,
		RateCardModule,
		BadgeModule,
		RightIconModule,
		LeftIconModule,
		BreadcrumbModule,
		LandingRequestModalModule,
		TextareaModule,
		AutosizeModule,
		CheckboxModule,
		LandingAgreementModalModule,
		QuestModule
	],
	exports: [RouterModule],
	declarations: [
		PublicComponent,
		HomeComponent,
		TariffsComponent,
		ClientsComponent,
		ContactsComponent,
		NewsComponent,
		// TODO: REMOVE IT AFTER TEST, ADD SHARED MODULE
		// DIRECTIVES
		MibScrollDirective,
		// SECTIONS
		MibSectionHeaderComponent,
		MibSectionHeaderNewsComponent,
		MibSectionBodyComponent,
		// COMPONENTS
		MibSliderComponent,
		UIKitTestComponent,
		MibMenuComponent,
		MibFooterComponent,
		MibSliderPartnersComponent,
		MibSliderNewsComponent,
		// CARDS
		MibCardTariffComponent,
		MibCardPersonComponent,
		MibCardNewsComponent,
		MibCardInfoComponent,
		TariffsComponent,
		ClientsComponent,
		ContactsComponent,
		LandingComponent,
		SingleNewsComponent
	],
	providers: [OrganizationService, NewsService]
})
export class PublicModule {}
