import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {NewFooterComponent} from './new-footer.component'
import {HeaderModule} from '../header/header.module'
import {SpacingModule} from '../../ui-kit/spacing/spacing.module'
import {LinkModule} from '../../ui-kit/link/link.module'
import {MediaModule} from '../../ui-kit/media/media.module'
import {IconModule} from '../../ui-kit/ref-icon/icon.module'
import {RouterLink} from '@angular/router'
import {ButtonModule} from '../../ui-kit/button/button.module'

@NgModule({
	declarations: [NewFooterComponent],
	imports: [
		CommonModule,
		SpacingModule,
		LinkModule,
		MediaModule,
		IconModule,
		RouterLink,
		ButtonModule
	],
	exports: [NewFooterComponent]
})
export class NewFooterModule {}
