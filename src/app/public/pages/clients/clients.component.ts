import {Component, OnDestroy, OnInit} from '@angular/core'
import {Subscription} from 'rxjs'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'

@Component({
	selector: 'clients',
	styleUrls: ['./clients.component.scss'],
	templateUrl: 'clients.component.html'
})
export class ClientsComponent implements OnInit, OnDestroy {
	public isDesktop: boolean = false

	private subscriptions = new Subscription()

	questions = [
		{
			title: 'Сколько времени рассматривается запрос?',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a est ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer maximus elementum ante et blandit. Aliquam erat volutpat. Cras eu tempor neque, vel porttitor libero. Suspendisse mi erat, pharetra in est sed, laoreet facilisis tellus. Aliquam egestas, quam id iaculis viverra, mauris nisl elementum dui, eget venenatis leo justo non magna. Mauris luctus nisl nec mollis tincidunt.'
		},
		{
			title: 'Зачем требуется выпуск электронной подписи?',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a est ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer maximus elementum ante et blandit. Aliquam erat volutpat.'
		},
		{
			title: 'Что такое "Фактор - Клиент"?',
			content:
				' Cras eu tempor neque, vel porttitor libero. Suspendisse mi erat, pharetra in est sed, laoreet facilisis tellus. Aliquam egestas, quam id iaculis viverra, mauris nisl elementum dui, eget venenatis leo justo non magna. Mauris luctus nisl nec mollis tincidunt.'
		},
		{
			title: 'Когда необходимо платить комиссию за услуги фактора?',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a est ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer maximus elementum ante et blandit. Aliquam erat volutpat. Cras eu tempor neque, vel porttitor libero. Suspendisse mi erat, pharetra in est sed, laoreet facilisis tellus. Aliquam egestas, quam id iaculis viverra, mauris nisl elementum dui, eget venenatis leo justo non magna. Mauris luctus nisl nec mollis tincidunt.'
		},
		{
			title: 'Требуется ли согласие покупателя на использование факторинга?',
			content:
				' Cras eu tempor neque, vel porttitor libero. Suspendisse mi erat, pharetra in est sed, laoreet facilisis tellus. Aliquam egestas, quam id iaculis viverra, mauris nisl elementum dui, eget venenatis leo justo non magna. Mauris luctus nisl nec mollis tincidunt.'
		}
	]

	constructor(public breakpointService: BreakpointObserverService) {}

	ngOnInit(): void {
		this.subscriptions = this.breakpointService
			.isDesktop()
			.subscribe(b => (this.isDesktop = b))
	}

	public downloadFile(name) {
		let link = document.createElement('a')
		if (name === 'factor') {
			link.download = 'FactorClientHelp'
			link.href = 'assets/_files/FactorClientHelp.zip'
		} else if (name === 'contract') {
			link.download = 'contract'
			link.href = 'assets/_files/contract.zip'
		} else if (name === 'instruction') {
			link.download = 'Договор о предоставлении факторинговых услуг'
			link.href =
				'assets/_files/Договор о предоставлении факторинговых услуг.pdf'
		} else {
			link.download = 'reglament'
			link.href = 'assets/_files/reglament.pdf'
		}
		link.click()
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
