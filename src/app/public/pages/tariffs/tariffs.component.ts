import {Component, OnDestroy, OnInit} from '@angular/core'
import {Subscription} from 'rxjs'
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
				'Страхование задолженности',
				'Финансирование до 100%',
				'Финансирование в день отгрузки'
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
				'Финансирование до 100%',
				'Финансирование в день отгрузки',
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
				'Финансирование до 100%',
				'Финансирование в день отгрузки',
				'Комиссия за каждый день',
				'Защита от риска неплатежа'
			]
		}
	]

	constructor(public breakpointService: BreakpointObserverService) {}

	ngOnInit(): void {
		this.subscriptions = this.breakpointService
			.isDesktop()
			.subscribe(b => (this.isDesktop = b))
	}

	public calculate() {
		console.log('calculate>>')
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
