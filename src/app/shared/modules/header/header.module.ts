import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './header.component'
import { SkeletonModule } from '../../ui-kit/skeleton/skeleton.module'
import { AvatarModule } from '../../ui-kit/avatar/avatar.module'
import { ButtonModule } from '../../ui-kit/button/button.module'
import { DropdownModule } from '../../ui-kit/dropdown/dropdown.module'
import { RefIconModule } from '../../ui-kit/ref-icon/ref-icon.module'
import { SpacingModule } from '../../ui-kit/spacing/spacing.module'
import { DropdownPointModule } from '../../ui-kit/dropdown-point/dropdown-point.module'
import { ClipboardModule } from '@angular/cdk/clipboard'
import { RouterLink } from '@angular/router'

@NgModule({
	declarations: [HeaderComponent],
	imports: [
		CommonModule,
		SkeletonModule,
		AvatarModule,
		ButtonModule,
		DropdownModule,
		RefIconModule,
		SpacingModule,
		DropdownPointModule,
		ClipboardModule,
		RouterLink
	],
	exports: [HeaderComponent]
})
export class HeaderModule {}
