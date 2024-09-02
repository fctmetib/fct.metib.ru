import {Component, OnDestroy, OnInit} from '@angular/core'
import {Subscription} from 'rxjs'
import {AuthService} from 'src/app/auth/services/auth.service'
import {LandingLoginModalService} from 'src/app/shared/modules/modals/landing-login-modal/landing-login-modal.service'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'

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
				'Запросы на факторинг рассматриваются оперативно. Первый ответ на Ваш запрос предоставляется в течение 15 минут с момента общения с менеджером. Мы стремимся обеспечить максимально быстрое и качественное обслуживание для удовлетворения Ваших потребностей.'
		},
		{
			title: 'Зачем требуется выпуск электронной подписи?',
			content:
				'Электронная подпись требуется для работы в программе Фактор-Клиент и обеспечения электронного документооборота. Она используется для подписания заявок на финансирование и комплекта документов по Договору факторинга, что позволяет ускорить и упростить процесс взаимодействия между сторонами. Выпуск ЭЦП осуществляет УК «Калуга Астрал». Выпуск ЭЦП бесплатный для клиента факторинга и осуществляется без личного присутствия.'
		},
		{
			title: 'Что такое "Фактор - Клиент"?',
			content:
				' "Фактор-Клиент" — это удобная система от Металлинвестбанка, которая позволяет вам эффективно управлять всеми процессами в рамках факторингового сотрудничества. В ней Вы можете подписывать документы, подавать заявки на финансирование и получать отчеты, обеспечивая быстрый и безопасный электронный документооборот.'
		},
		{
			title: 'Когда необходимо платить комиссию за услуги фактора?',
			content:
				'Комиссия за услуги фактора оплачивается либо в день финансирования, либо в день получения платежа от Покупателя, в зависимости от тарифного плана. Размер финансирования может достигать 100% суммы поставки, тогда взаиморасчеты с Банком происходят в день финансирования.'
		},
		{
			title: 'Требуется ли согласие покупателя на использование факторинга?',
			content:
				' Для некоторых Покупателей требуется предварительное согласование, а для других — нет. Чтобы узнать детали и процесс работы с конкретным дебитором, пожалуйста, обратитесь к менеджеру банка за консультацией.'
		}
	]

	constructor(
		public breakpointService: BreakpointObserverService,
		private toaster: ToasterService,
		private authService: AuthService,
		private landingLoginModalService: LandingLoginModalService
	) {}

	ngOnInit(): void {
		this.subscriptions = this.breakpointService
			.isDesktop()
			.subscribe(b => (this.isDesktop = b))
	}

	public downloadFile(name: string) {
		const isAuthenticated = this.authService.isAuthenticated();
	
		let link = document.createElement('a');
	
		if (
			!isAuthenticated &&
			(name === 'instruction' || name === 'installFactorClient' || name === 'reglament')
		) {
			this.landingLoginModalService.open().afterClosed().subscribe(result => {
				console.log(result)
				if (result) {
					this.downloadFile(name);
				}
			});
			return;
		}
	
		switch (name) {
			case 'reglament':
				link.download = 'reglament';
				link.href = 'assets/_files/reglament.pdf';
				break;
			case 'contract':
				link.download = 'Договор_о_предоставлении_факторинговых_услуг';
				link.href =
					'assets/_files/Договор_о_предоставлении_факторинговых_услуг.pdf';
				break;
			case 'instruction':
				link.download = 'FactorClientHelp';
				link.href = 'assets/_files/FactorClientHelp New.pdf';
				break;
			case 'installFactorClient':
				link.download = 'installFactorClient';
				link.href = 'assets/_files/FactorClient_Portable.zip';
				break;
			default:
				return;
		}
	
		link.click();
	}
	
	openEntryModal() {
	}

	getToast() {
		this.toaster.show(
			'failure',
			'Скачивание доступно только авторизованному пользователю!',
			'',
			true,
			false,
			2500
		)
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
