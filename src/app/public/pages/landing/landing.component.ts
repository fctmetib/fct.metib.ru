import {
	AfterViewInit,
	Component,
	ElementRef,
	Inject,
	OnDestroy,
	OnInit,
	PLATFORM_ID,
	ViewChild
} from '@angular/core'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'
import {ProductTabsEnum} from './enums/landing.enum'
import {NewsService} from '../../service/news.service'
import {
	BehaviorSubject,
	Subscription,
	catchError,
	debounceTime,
	distinctUntilChanged,
	finalize,
	map,
	of,
	switchMap,
	tap,
	zip
} from 'rxjs'
import {AdvancedNewsInterface} from '../../type/news.interface'
import {Properties} from 'csstype'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'
import {LandingRequestModalService} from 'src/app/shared/modules/modals/landing-request-modal/landing-request-modal.service'
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	ValidationErrors,
	Validators
} from '@angular/forms'
import {RequestLandingService} from '../../service/request-landing.service'
import {GetAgentRequestService} from '../../service/get-agent-request.service'
import {LandingAgreementModalService} from 'src/app/shared/modules/modals/landing-agreement-modal/landing-agreement-modal.service'
import {isPlatformBrowser} from '@angular/common'
import {ActivatedRoute} from '@angular/router'
import {SeoService} from 'src/app/shared/services/seo.service'
import {take} from 'rxjs/operators'

@Component({
	selector: 'mib-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy, AfterViewInit {
	public ProductTabsEnum = ProductTabsEnum

	form: FormGroup
	public isSubmitting$ = new BehaviorSubject<boolean>(false)
	public backendErrors$ = new BehaviorSubject<string>(null)
	public options = []
	public loading = false
	private submittedINNs = new Set<string>()

	maxPage: number = 3
	progress: number = 2

	questionList = [
		{
			question: 'Какой стороной сделки вы являетесь?',
			options: [
				{label: 'Поставщик', value: true},
				{label: 'Покупатель', value: false}
			],
			answer: null
		},
		{
			question: 'Для какой цели нужны денежные средства?',
			options: [
				{label: 'Финансирование поставок', value: true},
				{label: 'Финансирование закупок', value: false}
			],
			answer: null
		},
		{
			question: 'Ваш контрагент - резидент РФ?',
			options: [
				{label: 'Да, резидент', value: true},
				{label: 'Резидент другой страны', value: false}
			],
			answer: null
		}
	]

	public iconsDatas = [
		{
			id: 1,
			icon: 'fi_shield',
			// icon: 'fi_clipboard',
			title: 'Надежно',
			text: 'Отсутствие риска неоплаты со стороны дебитора'
		},
		{
			id: 2,
			icon: 'fi_copy',
			title: 'Прозрачно',
			text: 'Тарифные планы без скрытых комиссий или платежей'
		},
		{
			id: 3,
			icon: 'fi_clipboard',
			// icon: 'fi_shield',
			title: 'Без залога',
			text: 'Для оформления не требуется залог, нужна только поставка'
		},
		{
			id: 4,
			icon: 'fi_twitter',
			title: 'Без ограничений',
			text: 'Полученные деньги можно тратить на любые цели'
		}
	]

	public howDatas = [
		{
			id: 1,
			img: './assets/images/staff/how-bg/agreement.png',
			title: 'Договор с контрагентом',
			desc: 'Поставщик отгружает товары/оказывает услуги на условиях отсрочки платежа'
		},
		{
			id: 2,
			img: './assets/images/staff/how-bg/agent-agreement.png',
			title: 'Договор с фактором',
			desc: 'Клиент отправляет заявку в Личном кабинете и подписывает Договор факторинга'
		},
		{
			id: 3,
			img: './assets/images/staff/how-bg/financing.png',
			title: 'Финансирование',
			desc: 'Клиент получает Денежные средства за уступленные поставки на свой расчетный счет'
		},
		{
			id: 4,
			img: './assets/images/staff/how-bg/payment.png',
			title: 'Оплата задолженности',
			desc: 'Покупатель оплачивает поставки по истечении срока отсрочки'
		}
	]

	public partnersLogo = [
		{name: 'X5Group', img: './assets/images/staff/partners/X5Group 2.svg'},
		{name: 'Ozon', img: './assets/images/staff/partners/OZON_2019 2.svg'},
		{name: 'Obi', img: './assets/images/staff/partners/Obi.svg'},
		{name: 'Mvideo', img: './assets/images/staff/partners/Mvideo 2.svg'},
		{name: 'Metro', img: './assets/images/staff/partners/Logo_METRO 2.svg'},
		{
			name: 'Megafone',
			img: './assets/images/staff/partners/MegaFon_logo 2.svg'
		},
		{name: 'MTS', img: './assets/images/staff/partners/MTC_Logo_RGB 2.svg'},
		{
			name: 'Lemana',
			img: './assets/images/staff/partners/lemana.svg'
		},
		{name: 'Lenta', img: './assets/images/staff/partners/Lenta.svg'},
		{name: 'Lamoda', img: './assets/images/staff/partners/Lamoda_logo 2.svg'},
		{name: 'Familia', img: './assets/images/staff/partners/Familia.svg'}
	]

	newsDatas = [
		{
			id: 1,
			img: './assets/images/news/news-1.jpg',
			title: 'С Наступающим Новым 2024 годом!',
			date: '10 декабря 2023',
			link: '/news/1'
		},
		{
			id: 2,
			img: './assets/images/news/news-2.jpg',
			title: 'ПАО АКБ "Металлинвестбанк" посетил выставки',
			date: '12 декабря 2023',
			link: '/news/2'
		},
		{
			id: 3,
			img: './assets/images/news/news-3.jpg',
			title: 'Прямое финансирование Китайского Экспорта',
			date: '14 декабря 2023',
			link: '/news/3'
		}
	]

	public loading$ = new BehaviorSubject<boolean>(false)
	public newsNumberCount: number = 4
	public getAdvancedNews: AdvancedNewsInterface[]
	public imgNumber: number = 0
	public isBrowser: boolean

	public currentProductsTab?: ProductTabsEnum

	public defaultSkeleton: Properties = {
		borderRadius: '8px',
		height: '509px',
		margin: '0 auto'
	}

	public mobileSkeleton: Properties = {
		borderRadius: '8px',
		width: 'calc(100% - 32px)',
		height: '262px',
		margin: '0 16px'
	}

	public isDesktop: boolean = false

	private subscriptions = new Subscription()

	@ViewChild('scrollTarget', {static: true}) scrollTarget!: ElementRef
	@ViewChild('tagsContainer', {static: true}) tagsContainer: ElementRef

	constructor(
		@Inject(PLATFORM_ID) private platformId: Object,
		private newsService: NewsService,
		public breakpointService: BreakpointObserverService,
		public landingRequestModalService: LandingRequestModalService,
		public landingAgreementModalService: LandingAgreementModalService,
		private fb: FormBuilder,
		private requestLandingService: RequestLandingService,
		private toaster: ToasterService,
		private getAgentRequestService: GetAgentRequestService,
		private route: ActivatedRoute,
		private seoService: SeoService
	) {}

	ngOnInit(): void {
		this.initForm()
		this.isBrowser = isPlatformBrowser(this.platformId)

		if (isPlatformBrowser(this.platformId)) {
			this.subscriptions.add(
				this.breakpointService.isDesktop().subscribe(b => (this.isDesktop = b))
			)

			this.form
				.get('Organization')
				?.valueChanges.pipe(
					debounceTime(300),
					distinctUntilChanged(),
					tap(() => {
						this.options = []
						this.loading = true
					}),
					switchMap(value => this.fetchOptions(value))
				)
				.subscribe(options => {
					this.options = options.suggestions || []
					this.loading = false
				})
		}

		const routeData = this.route.snapshot.data[
			'landingNewsData'
		] as AdvancedNewsInterface[]
		if (routeData && routeData.length > 0) {
			this.getAdvancedNews = routeData
		} else {
			console.warn('No data received from LandingNewsResolver')
			this.getAdvancedNews = []
		}

		this.seoService.updateMetaTags({
			title:
				'Факторинг Металлинвестбанк услуги банковского факторинга в России',
			description:
				'Услуги банковского факторинга для поставщиков. Факторинг с регрессом, факторинг без регресса. Международный факторинг.',
			image: 'https://factoring.metallinvestbank.ru/ogimagemain.jpg',
			ogDescription:
				'Услуги банковского факторинга для поставщиков. Факторинг с регрессом, факторинг без регресса. Международный факторинг.'
		})
	}

	fetchOptions(query: string) {
		if (!query) {
			return of({suggestions: []})
		}
		return this.getAgentRequestService.getAgentData(query)
	}

	ngAfterViewInit() {
		if (isPlatformBrowser(this.platformId)) {
			this.updateShadows()
			this.tagsContainer.nativeElement.addEventListener('scroll', () =>
				this.updateShadows()
			)
		}
	}

	openLandingRequestModal(data: string) {
		this.landingRequestModalService.open(data)
	}

	openAgreementModal() {
		this.landingAgreementModalService.open()
	}

	onSwipe(event: any) {
		const container = this.tagsContainer.nativeElement
		const direction = event.deltaX > 0 ? 'right' : 'left'
		if (direction === 'left') {
			container.scrollLeft += 100
		} else if (direction === 'right') {
			container.scrollLeft -= 100
		}
		this.updateShadows()
	}

	updateShadows() {
		const container = this.tagsContainer.nativeElement
		const shadowLeft = container.parentElement.querySelector('.shadow-left')
		const shadowRight = container.parentElement.querySelector('.shadow-right')

		if (container.scrollLeft === 0) {
			shadowLeft.classList.add('hide-shadow')
		} else {
			shadowLeft.classList.remove('hide-shadow')
		}

		if (
			container.scrollWidth - container.scrollLeft ===
			container.clientWidth
		) {
			shadowRight.classList.add('hide-shadow')
		} else {
			shadowRight.classList.remove('hide-shadow')
		}
	}

	get hasNews(): boolean {
		return this.getAdvancedNews && this.getAdvancedNews.length > 0
	}

	public onChange($num) {
		this.imgNumber = $num
		this.currentProductsTab = $num
	}

	phoneDigitsValidator(control: AbstractControl): ValidationErrors | null {
		const digitsOnly = (control.value || '').replace(/\D/g, '')
		return digitsOnly.length === 11 ? null : {phoneInvalid: true}
	}

	initForm() {
		this.form = this.fb.group({
			FormName: 'Сайт  | Форма на главной странице, внизу',
			Name: ['', [Validators.required, Validators.minLength(2)]],
			Phone: ['', [Validators.required, this.phoneDigitsValidator]],
			Organization: ['', [Validators.required]],
			INN: ['', [Validators.required, Validators.pattern(/^[0-9]{10,12}$/)]],
			Email: ['', [Validators.required, Validators.email]],
			Comment: [''],
			UseFactoring: [false],
			Agree: [false, Validators.requiredTrue]
		})
	}

	private formatPhoneNumber(phoneNumber: string): string {
		phoneNumber = phoneNumber.replace(/\D/g, '')

		if (phoneNumber.length !== 11) {
			throw new Error('Phone number must be 11 digits long.')
		}

		const country = phoneNumber[0]
		const area = phoneNumber.substring(1, 4)
		const local = phoneNumber.substring(4, 7)
		const middle = phoneNumber.substring(7, 9)
		const last = phoneNumber.substring(9, 11)

		return `+${country} (${area}) ${local}-${middle}-${last}`
	}

	onSubmit() {
		const formType = this.form.value.FormName

		if (this.isSubmitting$.value) return

		if (this.form.invalid) {
			this.isSubmitting$.next(false)
			return
		}

		this.isSubmitting$.next(true)

		const rawPhoneNumber = this.form.value.Phone
		const formattedPhoneNumber = this.formatPhoneNumber(rawPhoneNumber)

		const formData = {
			from: formType,
			name: this.form.value.Name,
			phone: formattedPhoneNumber,
			email: this.form.value.Email,
			inn: this.form.value.INN,
			organization: this.form.value.Organization,
			comment: `${this.form.value.Comment}\nИспользует факторинг: ${
				this.form.value.UseFactoring ? 'Да' : 'Нет'
			}`,
			agree: this.form.value.Agree
		}

		this.requestLandingService
			.sendRequestData(formData)
			.pipe(
				take(1),
				tap(() => {
					this.toaster.show(
						'success',
						`Запрос отправлен (${formType})`,
						'',
						true,
						false,
						2500
					)
					this.form.reset()
					this.form.markAsPristine()
					this.form.markAsUntouched()
				}),
				catchError(error => {
					this.backendErrors$.next(error)
					this.toaster.show('failure', 'Ошибка сервера!', '', true, false, 2500)
					return of(error)
				}),
				finalize(() => {
					this.isSubmitting$.next(false)
				})
			)
			.subscribe()
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
