import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FileCellComponent } from './file-cell.component'
import { IconModule } from '../ref-icon/icon.module'
import { FileService } from '../../services/common/file.service'

@NgModule({
	declarations: [FileCellComponent],
	exports: [FileCellComponent],
	imports: [CommonModule, IconModule],
	providers: [FileService]
})
export class FileCellModule {}
