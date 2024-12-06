import {isPlatformBrowser} from '@angular/common'
import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core'
import {Subscription} from 'rxjs'
import {LandingRequestModalService} from 'src/app/shared/modules/modals/landing-request-modal/landing-request-modal.service'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'

@Component({
	selector: 'tariffs.html',
	styleUrls: ['./tariffs.component.scss'],
	templateUrl: './tariffs.component.html'
})
export class TariffsComponent implements OnInit, OnDestroy {
	public isDesktop: boolean = false

	private subscriptions = new Subscription()

	public rates = [
		{
			title: 'Premium',
			content:
				'Максимальная выгода от финансирования поставок сетевым покупателям',
			list: [
				'Финансирование до 100%',
				'Финансирование в день отгрузки',
				'Выплата на любой расчетный счет',
				'Страхование задолженности'
			],
			extra: [
				{title: 'Комиссия за каждый день', tariff: 'Compromise'},
				{title: 'Защита от риска неплатежа', tariff: 'Compromise No risk'}
			]
		},
		{
			title: 'Compromise',
			content: 'Компромиссное решение с возможностью гибкого финансирования',
			list: [
				'Финансирование до 100%',
				'Финансирование в день отгрузки',
				'Выплата на любой расчетный счет',
				'Страхование задолженности',
				'Комиссия за каждый день'
			],
			extra: [
				{title: 'Защита от риска неплатежа', tariff: 'Compromise No risk'}
			]
		},
		{
			title: 'Compromise No risk',
			content: 'Финансирование поставок с покрытием риска покупателя',
			list: [
				'Финансирование до 100%',
				'Финансирование в день отгрузки',
				'Выплата на любой расчетный счет',
				'Страхование задолженности',
				'Комиссия за каждый день',
				'Защита от риска неплатежа'
			]
		}
	]

	constructor(
		@Inject(PLATFORM_ID) private platformId: Object,
		public breakpointService: BreakpointObserverService,
		public landingRequestModalService: LandingRequestModalService
	) {}

	ngOnInit(): void {
		if (isPlatformBrowser(this.platformId)) {
			this.subscriptions.add(
				this.breakpointService.isDesktop().subscribe(b => (this.isDesktop = b))
			)
		} else {
			this.isDesktop = true
		}
	}

	openLandingRequestModal(data) {
		this.landingRequestModalService.open(data)
	}

	public calculate() {
		console.log('calculate>>')
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
