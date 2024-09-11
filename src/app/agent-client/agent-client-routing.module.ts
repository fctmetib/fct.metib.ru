import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {AuthGuard} from '../shared/services/auth.guard'
import {UserVerifyGuard} from '../shared/services/user-verify.guard'
import {AgentClientComponent} from './agent-client.component'

const routes: Routes = [
	{
		path: '',
		component: AgentClientComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: '',
				canActivateChild: [UserVerifyGuard],
				children: [
					{
						path: 'cabinet',
						loadChildren: () =>
							import('./modules/cabinet/agent-client-cabinet.module').then(
								m => m.AgentClientCabinetModule
							),
						title: 'Агентский Факторинг | Кабинет'
					},
					{
						path: 'register',
						loadChildren: () =>
							import('./modules/register/agent-client-register.module').then(
								m => m.AgentClientRegisterModule
							),
						title: 'Агентский Факторинг | Реестры'
					},
					{
						path: 'payment-register',
						loadChildren: () =>
							import(
								'./modules/payment-register/agent-client-payment-register.module'
							).then(m => m.AgentClientPaymentRegisterModule),
						title: 'Агентский Факторинг | Реестры к оплате'
					},
					{
						path: 'creditors',
						loadChildren: () =>
							import('./modules/creditors/agent-client-creditors.module').then(
								m => m.AgentClientCreditorsModule
							),
						title: 'Агентский Факторинг | Кредиторы'
					},
					{
						path: 'payments',
						loadChildren: () =>
							import('./modules/payments/agent-client-payments.module').then(
								m => m.AgentClientPaymentsModule
							),
						title: 'Агентский Факторинг | Оплаты'
					},
					{
						path: 'invoices-payment',
						loadChildren: () =>
							import(
								'./modules/invoices-payment/agent-client-invoices-payment.module'
							).then(m => m.AgentClientInvoicesPaymentModule),
						title: 'Агентский Факторинг | Счета на оплату'
					},
					{
						path: 'queries',
						loadChildren: () =>
							import('./modules/queries/agent-client-queries.module').then(
								m => m.AgentClientQueriesModule
							),
						title: 'Агентский Факторинг | Запросы'
					},
					{
						path: 'contracts',
						loadChildren: () =>
							import('./modules/contracts/agent-client-contracts.module').then(
								m => m.AgentClientContractsModule
							),
						title: 'Агентский Факторинг | Договоры'
					},
					{
						path: 'reports',
						loadChildren: () =>
							import('./modules/reports/agent-client-reports.module').then(
								m => m.AgentClientReportsModule
							),
						title: 'Агентский Факторинг | Отчеты'
					},
					{
						path: 'pay-agent-reports',
						loadChildren: () =>
							import(
								'./modules/pay-agent-reports/agent-client-pay-agent-reports.module'
							).then(m => m.AgentClientPayAgentReportsModule),
						title: 'Агентский Факторинг | Отчеты платежного агента'
					},
					{
						path: 'documents',
						loadChildren: () =>
							import('./modules/documents/agent-client-documents.module').then(
								m => m.AgentClientDocumentsModule
							),
						title: 'Агентский Факторинг | Отчеты платежного агента'
					}
				]
			}
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AgentClientRoutingModule {}
