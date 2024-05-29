import {Component, Input} from '@angular/core'
import {AuthService} from 'src/app/auth/services/auth.service'

@Component({
	selector: 'mib-mobile-menu',
	templateUrl: './mobile-menu.component.html',
	styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent {
	menuClient = [
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
		{name: 'Новости', link: '/admin/cabinet'},
		{name: 'Организации', link: '/admin/organizations'},
		{name: 'Пользователи', link: '/admin/users'},
		{name: 'Бизнес-тесты', link: '/admin/tests'}
	]
	menuVerify = [{name: 'Запросы', link: '/client/not-verify'}]

	menuMain = [
		{name: 'Главная', link: '/'},
		{name: 'Тарифы', link: '/tariffs'},
		{name: 'Клиентам', link: '/clients'},
		{name: 'Контакты', link: '/contacts'}
	]
	@Input() isClient: boolean = false
	public isOpen: Boolean = false

	constructor(public authService: AuthService) {}

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
