import {isPlatformBrowser} from '@angular/common'
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener, inject,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import {AuthService} from 'src/app/auth/services/auth.service'
import { WINDOW } from '../../../../../tokens/window.token';

@Component({
	selector: 'mib-mobile-menu',
	templateUrl: './mobile-menu.component.html',
	styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit, AfterContentInit {
	@ViewChild('mobileMenu') mobileMenu!: ElementRef

	menuUser = [
		{
			links: [
				{name: 'Кабинет', link: '/client/cabinet'},
				{name: 'Заявки', link: '/client/requests'},
				{name: 'Свободная задолженность', link: '/client/freeduty'}
			]
		},
		{
			links: [
				{name: 'Платежи', link: '/client/invoices'},
				{name: 'Просрочка платежа', link: '/client/delays'},
				{name: 'Договоры', link: '/client/contracts'}
			]
		},
		{
			links: [
				{name: 'Отчеты', link: '/client/reports'},
				{name: 'Электронные документы', link: '/client/documents'},
				{name: 'Запросы', link: '/client/demand'}
			]
		}
	]

	menuAdmin = [
		{
			links: [
				{name: 'Новости', link: '/admin/cabinet'},
				{name: 'Организации', link: '/admin/organizations'},
				{name: 'Пользователи', link: '/admin/users'},
				{name: 'Бизнес-тесты', link: '/admin/tests'}
			]
		}
	]

	menuVerify = [
		{
			links: [{name: 'Запросы', link: '/client/not-verify'}]
		}
	]

	menuMain = [
		{
			links: [
				{name: 'Главная', link: '/'},
				{name: 'Тарифы', link: '/tariffs'},
				{name: 'Клиентам', link: '/clients'},
				{name: 'Контакты', link: '/contacts'}
			]
		}
	]

	@Input() isClient: boolean = false
	@Input() isAdmin: boolean = false
	public isOpen: Boolean = false
	isVerify: boolean = false
	isLogged: boolean = false
	isAuthenticated: boolean = false

	isScrollable: boolean = false

	constructor(
		public authService: AuthService,
		private cdr: ChangeDetectorRef,
		@Inject(PLATFORM_ID) private platformId: Object
	) {}

  private window = inject(WINDOW)

	ngAfterContentInit(): void {
		if (isPlatformBrowser(this.platformId)) {
			this.checkIfScrollable()
		}
	}

	@HostListener('window:resize')
	onWindowResize() {
		if (this.isOpen && isPlatformBrowser(this.platformId)) {
			this.checkIfScrollable()
		}
	}

	ngOnInit(): void {
		if (isPlatformBrowser(this.platformId)) {
			this.isVerify = this.authService.isUserVerified()
			this.isLogged = this.authService.isUserLoggedIn
		}
	}

	public onBurger() {
		this.isOpen = !this.isOpen
		if (isPlatformBrowser(this.platformId)) {
			this.cdr.detectChanges()

			setTimeout(() => {
				this.checkIfScrollable()
			}, 0)
		}
	}

	logout() {
		if (isPlatformBrowser(this.platformId)) {
			this.authService.logout()
		}
	}

	checkIfScrollable() {
		if (isPlatformBrowser(this.platformId) && this.mobileMenu) {
			const menuHeight = this.mobileMenu.nativeElement.scrollHeight
			const viewHeight = this.window?.innerHeight ?? 0
			this.isScrollable = menuHeight > viewHeight
		}
	}
}
