import {CommonModule} from '@angular/common'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import {NgModule} from '@angular/core'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {AvatarModule} from 'primeng/avatar'
import {ButtonModule} from 'primeng/button'
import {CardModule} from 'primeng/card'
import {CheckboxModule} from 'primeng/checkbox'
import {DropdownModule} from 'primeng/dropdown'
import {DialogService} from 'primeng/dynamicdialog'
import {InputTextModule} from 'primeng/inputtext'
import {InputTextareaModule} from 'primeng/inputtextarea'
import {MenuModule} from 'primeng/menu'
import {MenubarModule} from 'primeng/menubar'
import {RadioButtonModule} from 'primeng/radiobutton'
import {SkeletonModule} from 'primeng/skeleton'
import {AdminGuard} from '../shared/services/admin.guard'
import {ProgressSpinnerModule} from 'primeng/progressspinner'
import {AdminComponent} from './admin.component'
import {MobileHeaderComponent} from './shared/mobile-header/mobile-header.component'
import {AdminAuthInterceptor} from './shared/services/admin-auth.interceptor'
import {PageStoreService} from './shared/services/page-store.service'
import {HeaderModule} from '../shared/modules/header/header.module'
import {SpacingModule} from '../shared/ui-kit/spacing/spacing.module'
import {SidebarModule} from '../shared/ui-kit/sidebar/sidebar.module'
import {CabinetModule} from './modules/cabinet/cabinet.module'

const routes = [
	{
		path: '',
		component: AdminComponent,
		canActivate: [AdminGuard],
		children: [
			{
				path: 'cabinet',
				loadChildren: () =>
					import('./modules/cabinet/cabinet.module').then(m => m.CabinetModule),
				title: 'Новости | Металлинвест Банк'
			},
			{
				path: 'organizations',
				loadChildren: () =>
					import('./modules/organizations/organizations.module').then(
						m => m.OrganizationsModule
					),
				title: 'Организации | Металлинвест Банк'
			},
			{
				path: 'tests',
				loadChildren: () =>
					import('./modules/tests/tests.module').then(m => m.TestsModule),
				title: 'Бизнес-тесты | Металлинвест Банк'
			},
			{
				path: 'users',
				loadChildren: () =>
					import('./modules/users/users.module').then(m => m.UsersModule),
				title: 'Пользователи | Металлинвест Банк'
			}
		]
	}
]

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		InputTextModule,
		CheckboxModule,
		ButtonModule,
		ProgressSpinnerModule,
		RadioButtonModule,
		InputTextareaModule,
		DropdownModule,
		MenuModule,
		SkeletonModule,
		FormsModule,
		ReactiveFormsModule,
		CardModule,
		MenubarModule,
		AvatarModule,
		FormsModule,
		ReactiveFormsModule,
		HeaderModule,
		SpacingModule,
		SidebarModule,
		CabinetModule,
		RouterModule.forChild(routes)
	],
	exports: [RouterModule],
	declarations: [AdminComponent, MobileHeaderComponent],
	providers: [
		PageStoreService,
		DialogService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AdminAuthInterceptor,
			multi: true
		}
	]
})
export class AdminModule {}
