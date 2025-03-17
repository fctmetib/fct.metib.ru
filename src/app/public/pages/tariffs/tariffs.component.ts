import {isPlatformBrowser} from '@angular/common'
import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core'
import {Subscription} from 'rxjs'
import {LandingRequestModalService} from 'src/app/shared/modules/modals/landing-request-modal/landing-request-modal.service'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'
import { SeoService } from 'src/app/shared/services/seo.service'

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
      title: 'Премиум',
      content: 'Оптимальное решение с увеличенным процентом финансирования',
      list: [
        'Финансирование до 100%',
        'Финансирование в день отгрузки',
        'Бездокументарное финансирование',
        'Выплата на любой расчётный счёт',
        'Фиксированная комиссия за отсрочку',
        'Оплата комиссии в день финансирования',
        'Управление дебиторской задолженностью',
        'Бесплатный льготный период*',
        'Защита от риска неплатежа'
      ],
      extra: [
        {title: 'Защита от риска неплатежа', tariff: 'Универсальный'}
      ]
    },
    {
      title: 'Универсальный',
      content: 'Самый удобный вариант финансирования с ежемесячным списанием комиссии',
      list: [
        'Финансирование до 95%',
        'Финансирование в день отгрузки',
        'Бездокументарное финансирование',
        'Выплата на любой расчётный счёт',
        'Комиссия за каждый день',
        'Ежемесячное начисление комиссии с суммы финансирования',
        'Управление дебиторской задолженностью',
        'Льготный период до 60 к.д.',
        'Регресс/безрегресс'
      ],
      badge: 'Рекомендуем'
    },
    {
      title: 'Универсальный Экспорт',
      content: 'Безопасное финансирование поставок Покупателю-нерезиденту',
      list: [
        'Финансирование до 95%',
        'Финансирование в день подтверждения поставок Импорт-фактором',
        'Работа без оригинала отгрузочных документов**',
        'Выплата на любой расчётный счёт',
        'Комиссия за каждый день',
        'Ежемесячное начисление комиссии с суммы финансирования',
        'Управление дебиторской задолженностью',
        'Льготный период до 90 к.д.',
        'Гарантия оплаты от Импорт-Фактора',
        'Безрегресс'
      ]
    }
  ];

	constructor(
		@Inject(PLATFORM_ID) private platformId: Object,
		public breakpointService: BreakpointObserverService,
		public landingRequestModalService: LandingRequestModalService,
		private seoService: SeoService
	) {}

	ngOnInit(): void {
		if (isPlatformBrowser(this.platformId)) {
			this.subscriptions.add(
				this.breakpointService.isDesktop().subscribe(b => (this.isDesktop = b))
			)
		} else {
			this.isDesktop = true
		}


		this.seoService.updateMetaTags({
			title:
				'Тарифы на услуги банковского факторинга, факторинг стоимость',
			description:
				'Тарифы на услуги банковского факторинга для поставщиков, сколько стоит факторинг',
			image: 'https://factoring.metallinvestbank.ru/ogimagemain.jpg',
			ogDescription:
				'Тарифы на услуги банковского факторинга для поставщиков, сколько стоит факторинг'
		})

		const currentUrl = "https://factoring.metallinvestbank.ru/tariffs";
		this.addCanonicalLink(currentUrl)
	}

	openLandingRequestModal(data) {
		this.landingRequestModalService.open(data)
	}

	public calculate() {
		console.log('calculate>>')
	}

	private addCanonicalLink(url: string) {
		const link: HTMLLinkElement =
			document.querySelector("link[rel='canonical']") ||
			document.createElement('link')
		link.setAttribute('rel', 'canonical')
		link.setAttribute('href', url)
		document.head.appendChild(link)
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
