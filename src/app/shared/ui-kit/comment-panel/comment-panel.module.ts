import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {CommentPanelComponent} from './comment-panel.component'
import {AvatarModule} from '../avatar/avatar.module'
import {ButtonModule} from '../button/button.module'
import {IconModule} from '../ref-icon/icon.module'
import {SpacingModule} from '../spacing/spacing.module'

@NgModule({
	declarations: [CommentPanelComponent],
	exports: [CommentPanelComponent],
	imports: [CommonModule, AvatarModule, ButtonModule, IconModule, SpacingModule]
})
export class CommentPanelModule {}
