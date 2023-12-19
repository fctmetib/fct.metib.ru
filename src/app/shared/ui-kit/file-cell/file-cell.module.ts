import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FileCellComponent } from './file-cell.component'
import { RefIconModule } from '../ref-icon/ref-icon.module'

@NgModule({
	declarations: [FileCellComponent],
	exports: [FileCellComponent],
	imports: [CommonModule, RefIconModule]
})
export class FileCellModule {}
