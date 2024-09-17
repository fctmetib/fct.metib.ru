import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DlFileCellComponent} from './dl-file-cell.component'
import {IconModule} from '../ref-icon/icon.module'
import {ButtonModule} from '../button/button.module'

@NgModule({
	declarations: [DlFileCellComponent],
	imports: [CommonModule, IconModule, ButtonModule],
	exports: [DlFileCellComponent]
})
export class DlFileCellModule {}
