import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {CommentPanelComponent} from './comment-panel.component'

@NgModule({
	declarations: [CommentPanelComponent],
	exports: [CommentPanelComponent],
	imports: [CommonModule]
})
export class CommentPanelModule {}
