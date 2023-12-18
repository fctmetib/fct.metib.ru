import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FileCellComponent } from './file-cell.component'

@NgModule({
	declarations: [FileCellComponent],
	exports: [FileCellComponent],
	imports: [CommonModule]
})
export class FileCellModule {}
