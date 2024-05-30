import {Component, Input} from '@angular/core'
import {AuthService} from 'src/app/auth/services/auth.service'

@Component({
	selector: 'mib-mobile-menu',
	templateUrl: './mobile-menu.component.html',
	styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent {
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

	constructor(public authService: AuthService) {}

	ngOnInit(): void {
		this.isVerify = this.authService.isUserVerified()
		this.isLogged = this.authService.isUserLoggedIn
	}

	public onBurger() {
		this.isOpen = !this.isOpen
	}

	public closeBurgerMenu() {
		this.isOpen = !this.isOpen
	}

	logout() {
		this.authService.logout()
	}
}
