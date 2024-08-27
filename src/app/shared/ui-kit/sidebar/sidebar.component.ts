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
			links: [{name: 'Кабинет', link: '/agent-client/cabinet'}]
		},
		{
			links: [
				{name: 'Реестры', link: '/agent-client/register'},
				{name: 'Реестры к оплате', link: '/agent-client/payment-register'},
				{name: 'Кредиторы', link: '/agent-client/creditors'}
			]
		},
		{
			links: [
				{name: 'Оплаты', link: '/agent-client/payments'},
				{name: 'Счета на оплату', link: '/agent-client/invoices-payment'},
				{name: 'Запросы', link: '/agent-client/queries'}
			]
		},
		{
			links: [
				{name: 'Договоры', link: '/agent-client/contracts'},
				{name: 'Отчеты', link: '/agent-client/reports'},
				{
					name: 'Отчеты платежного агента',
					link: '/agent-client/pay-agent-reports'
				},
				{name: 'Электронные документы', link: '/agent-client/documents'}
			]
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
