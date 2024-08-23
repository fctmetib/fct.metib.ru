import {Component, OnInit} from '@angular/core'
import {AuthService} from 'src/app/auth/services/auth.service'
import {ActivatedRoute, Router} from '@angular/router'

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
export class SidebarComponent implements OnInit {
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
	menuAgentUser = [
		{
			links: [{name: 'Кобинет', link: 'agent-client/cabinet'}]
		}
	]

	isAdmin: boolean = true
	isVerify: boolean = true

	currentRoute: string

	constructor(
		public authService: AuthService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.isAdmin = this.authService.isUserAdmin()
		this.isVerify = this.authService.isUserVerified()

		this.route.url.subscribe(() => {
			this.currentRoute = this.router.url.split('/').slice(-2)[0] || ''
		})
	}

	navigateTo(currUrl) {
		this.router.navigate([`${currUrl}/cabinet`])
	}

	logout() {
		this.authService.logout()
	}
}
