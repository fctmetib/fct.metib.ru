import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FileCellComponent } from './file-cell.component'
import { RefIconModule } from '../ref-icon/ref-icon.module'
import { FileService } from '../../services/common/file.service'

@NgModule({
	declarations: [FileCellComponent],
	exports: [FileCellComponent],
	imports: [CommonModule, RefIconModule],
	providers: [FileService]
})
export class FileCellModule {}
