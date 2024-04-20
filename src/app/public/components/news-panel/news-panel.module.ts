import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {NewsPanelComponent} from './news-panel.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'
import {LinkModule} from 'src/app/shared/ui-kit/link/link.module'
import {TagModule} from 'src/app/shared/ui-kit/tag/tag.module'
import {RouterLink} from '@angular/router'
import {ButtonModule} from 'src/app/shared/ui-kit/button/button.module'
import {IconModule} from 'src/app/shared/ui-kit/ref-icon/icon.module'

@NgModule({
	declarations: [NewsPanelComponent],
	imports: [
		CommonModule,
		SpacingModule,
		LinkModule,
		TagModule,
		RouterLink,
		ButtonModule,
		IconModule
	],
	exports: [NewsPanelComponent]
})
export class NewsPanelModule {}
