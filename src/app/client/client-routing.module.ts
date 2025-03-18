import {AuthGuard} from '../shared/services/auth.guard'
import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {UserVerifyGuard} from '../shared/services/user-verify.guard'
import {ClientComponent} from './client.component'

const routes = [
	{
		path: '',
		component: ClientComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: '',
				canActivateChild: [UserVerifyGuard],
				children: [
					{
						path: 'cabinet',
						loadChildren: () =>
							import('./modules/cabinet/cabinet.module').then(
								m => m.CabinetModule
							),
						title: 'Факторинг | Кабинет'
					},
					{
						path: 'requests',
						loadChildren: () =>
							import('./modules/requests/requests.module').then(
								m => m.RequestsModule
							),
						title: 'Факторинг | Заявки'
					},
					{
						path: 'freeduty',
						loadChildren: () =>
							import('./modules/freeduty/free-duty.module').then(
								m => m.FreeDutyModule
							),
						title: 'Факторинг | Задолженность'
					},
					{
						path: 'invoices',
						loadChildren: () =>
							import('./modules/invoices/invoices.module').then(
								m => m.InvoicesModule
							),
						title: 'Факторинг | Платежи'
					},
					{
						path: 'contracts',
						loadChildren: () =>
							import('./modules/contracts/contracts.module').then(
								m => m.ContractsModule
							),
						title: 'Факторинг | Договоры'
					},
					{
						path: 'documents',
						loadChildren: () =>
							import('./modules/documents/documents.module').then(
								m => m.DocumentsModule
							),
						title: 'Факторинг | Документы'
					},
					{
						path: 'reports',
						loadChildren: () =>
							import('./modules/reports/reports.module').then(
								m => m.ReportsModule
							),
						title: 'Факторинг | Отчеты'
					},
					{
						path: 'delays',
						loadChildren: () =>
							import('./modules/delays/delays.module').then(
								m => m.DelaysModule
							),
						title: 'Факторинг | Просрочки'
					}
				],
			},
      {
        path: 'demand',
        loadChildren: () =>
          import('../client/modules/demand-new/demand-new.module').then(
            m => m.DemandNewModule
          ),
        title: 'Факторинг | Запросы'
      },
			// {
			// 	path: 'not-verify',
			// 	loadChildren: () =>
			// 		import('../client/modules/not-verify/not-verify.module').then(
			// 			m => m.NotVerifyModule
			// 		)
			// }
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ClientRoutingModule {}
