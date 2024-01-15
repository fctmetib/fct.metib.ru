import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {NewDocumentsViewsDrawerComponent} from './new-documents-views-drawer.component'
import {NewDocumentsViewsDrawerService} from './new-documents-views-drawer.service'
import {DrawerModule} from 'src/app/shared/ui-kit/drawer/drawer.module'
import {MatDialogModule} from '@angular/material/dialog'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'
import {InputModule} from 'src/app/shared/ui-kit/input/input.module'
import {SkeletonModule} from 'src/app/shared/ui-kit/skeleton/skeleton.module'
import {TagModule} from 'src/app/shared/ui-kit/tag/tag.module'
import {AvatarModule} from 'src/app/shared/ui-kit/avatar/avatar.module'
import {FileCellModule} from 'src/app/shared/ui-kit/file-cell/file-cell.module'
import {LinkModule} from 'src/app/shared/ui-kit/link/link.module'
import {LeftIconModule} from 'src/app/shared/directives/left-icon/left-icon.module'
import {TabModule} from 'src/app/shared/ui-kit/tab/tab.module'
import {TableModule} from 'src/app/shared/ui-kit/table/table.module'
import {DropdownPointModule} from 'src/app/shared/ui-kit/dropdown-point/dropdown-point.module'
import {DropdownModule} from 'src/app/shared/ui-kit/dropdown/dropdown.module'
import {PaginatorModule} from 'src/app/shared/ui-kit/paginator/paginator.module'
import {SelectModule} from 'src/app/shared/ui-kit/select/select.module'
import {NavbarModule} from 'src/app/shared/ui-kit/navbar/navbar.module'

@NgModule({
	declarations: [NewDocumentsViewsDrawerComponent],
	imports: [
		CommonModule,
		DrawerModule,
		MatDialogModule,
		SpacingModule,
		ButtonModule,
		IconModule,
		InputModule,
		SkeletonModule,
		TagModule,
		AvatarModule,
		FileCellModule,
		LinkModule,
		LeftIconModule,
		TabModule,
		TableModule,
		DropdownPointModule,
		DropdownModule,
		PaginatorModule,
		SelectModule,
		NavbarModule
	],
	providers: [NewDocumentsViewsDrawerService]
})
export class NewDocumentsViewsDrawerModule {}
