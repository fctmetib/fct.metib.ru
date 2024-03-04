import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {NewsPanelComponent} from './news-panel.component'
import {SpacingModule} from 'src/app/shared/ui-kit/spacing/spacing.module'

@NgModule({
	declarations: [NewsPanelComponent],
	imports: [CommonModule, SpacingModule],
	exports: [NewsPanelComponent]
})
export class NewsPanelModule {}
