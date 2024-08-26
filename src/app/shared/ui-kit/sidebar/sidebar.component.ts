import {Component, OnDestroy, OnInit} from '@angular/core'
import {AuthService} from 'src/app/auth/services/auth.service'
import {ActivatedRoute, Router} from '@angular/router'
import {Subject, takeUntil} from 'rxjs'

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
export class SidebarComponent implements OnInit, OnDestroy {
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
			links: [{name: 'Кобинет-agent', link: '/agent-client/cabinet'}]
		}
	]

	isAdmin: boolean = true
	isVerify: boolean = true
	isAgentFactoring: boolean = false
	private unsubscribe$ = new Subject<void>()

	currentRoute: string

	constructor(
		public authService: AuthService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.isAdmin = this.authService.isUserAdmin()
		this.isVerify = this.authService.isUserVerified()

		this.route.url.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
			this.currentRoute = this.router.url.split('/').slice(-2)[0] || ''
			this.isAgentFactoring = this.currentRoute === 'agent-client'
		})
	}

	navigateTo(currUrl) {
		this.router.navigate([`${currUrl}/cabinet`])
	}

	logout() {
		this.authService.logout()
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next()
		this.unsubscribe$.complete()
	}
}
