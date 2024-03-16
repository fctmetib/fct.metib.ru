import {Component} from '@angular/core'
import {AuthService} from 'src/app/auth/services/auth.service'

export interface ISidebarGroup {
	links: ISidebarLink[]
}

export interface ISidebarLink {
	name: string
	link: string
}

@Component({
	selector: 'mib-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
	menu = [
		{
			links: [
				{name: 'Кабинет', link: '/client/cabinet'},
				{name: 'Заявки', link: '/client/requests'},
				{name: 'Свободная задолженность', link: '/client/freeduty'}
			]
		},
		{
			links: [
				{name: 'Запросы', link: '/client/demand'},
				{name: 'Платежи', link: '/client/invoices'},
				{name: 'Просрочки покупателя', link: '/client/delays'}
			]
		},
		{
			links: [
				{name: 'Договоры', link: '/client/contracts'},
				{name: 'Отчеты', link: '/client/reports'},
				{name: 'Электронные документы', link: '/client/documents'}
			]
		}
	]

	constructor(public authService: AuthService) {}

	logout() {
		this.authService.logout()
	}
}
