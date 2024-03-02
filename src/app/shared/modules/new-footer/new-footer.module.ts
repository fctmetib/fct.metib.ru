import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {NewFooterComponent} from './new-footer.component'
import {HeaderModule} from '../header/header.module'
import {SpacingModule} from '../../ui-kit/spacing/spacing.module'
import {LinkModule} from '../../ui-kit/link/link.module'
import {MediaModule} from '../../ui-kit/media/media.module'

@NgModule({
	declarations: [NewFooterComponent],
	imports: [CommonModule, HeaderModule, SpacingModule, LinkModule, MediaModule],
	exports: [NewFooterComponent]
})
export class NewFooterModule {}
