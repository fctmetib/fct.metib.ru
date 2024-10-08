import {CommonModule, DatePipe} from '@angular/common'
import {NgModule} from '@angular/core'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {AvatarModule} from 'primeng/avatar'
import {ButtonModule as ButtonModule22} from 'primeng/button'
import {CardModule} from 'primeng/card'
import {CheckboxModule} from 'primeng/checkbox'
import {DropdownModule} from 'primeng/dropdown'
import {InputTextModule} from 'primeng/inputtext'
import {InputTextareaModule} from 'primeng/inputtextarea'
import {MenuModule} from 'primeng/menu'
import {MenubarModule} from 'primeng/menubar'
import {RadioButtonModule} from 'primeng/radiobutton'
import {SkeletonModule as SkeletonModule22} from 'primeng/skeleton'
import {CalendarModule} from 'primeng/calendar'
import {CardNewsComponent} from '../../shared/components/cards/card-news/card-news.component'
import {CabinetComponent} from './pages/cabinet.component'
import {CreateNewsDialogComponent} from './components/create-news-dialog/create-news-dialog.component'
import {DialogService} from 'primeng/dynamicdialog'
import {PaginatorModule as PaginatorModule22} from 'primeng/paginator'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {TabModule} from 'src/app/shared/ui-kit/tab/tab.module'
import {NavbarModule} from 'src/app/shared/ui-kit/navbar/navbar.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {LeftIconModule} from 'src/app/shared/directives/left-icon/left-icon.module'
import {LabelModule} from 'src/app/shared/directives/label/label.module'
import {SelectModule} from 'src/app/shared/ui-kit/select/select.module'
import {DropdownPointModule} from 'src/app/shared/ui-kit/dropdown-point/dropdown-point.module'
import {NewsPanelModule} from 'src/app/public/components/news-panel/news-panel.module'
import {CabinetNewsDrawerModule} from './modules/cabinet-news-drawer/cabinet-news-drawer.module'
import {CabinetCreateNewsDrawerModule} from './modules/cabinet-create-news-drawer/cabinet-create-news-drawer.module'
import {SkeletonModule} from 'src/app/shared/ui-kit/skeleton/skeleton.module'
import {PaginatorModule} from 'src/app/shared/ui-kit/paginator/paginator.module'

const routes = [
	{
		path: '',
		canActivate: [],
		children: [
			{
				path: '',
				component: CabinetComponent
			}
		]
	}
]

@NgModule({
	imports: [
		CommonModule,
		InputTextModule,
		CheckboxModule,
		ButtonModule22,
		RadioButtonModule,
		InputTextareaModule,
		CalendarModule,
		DropdownModule,
		MenuModule,
		SkeletonModule22,
		FormsModule,
		ReactiveFormsModule,
		CardModule,
		MenubarModule,
		AvatarModule,
		FormsModule,
		ReactiveFormsModule,
		PaginatorModule22,
		SpacingModule,
		TabModule,
		NavbarModule,
		IconModule,
		ButtonModule,
		InputModule,
		LeftIconModule,
		LabelModule,
		SelectModule,
		DropdownPointModule,
		NewsPanelModule,
		CabinetNewsDrawerModule,
		CabinetCreateNewsDrawerModule,
		SkeletonModule,
		PaginatorModule,
		RouterModule.forChild(routes)
	],
	exports: [RouterModule],
	declarations: [
		CabinetComponent,
		// Components
		CardNewsComponent,
		CreateNewsDialogComponent
	],
	providers: [DatePipe, DialogService]
})
export class CabinetModule {}
