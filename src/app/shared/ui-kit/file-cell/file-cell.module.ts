import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FileCellComponent} from './file-cell.component'
import {IconModule} from '../ref-icon/icon.module'
import {FileService} from '../../services/common/file.service'
import {AvatarModule} from '../avatar/avatar.module'

@NgModule({
	declarations: [FileCellComponent],
	exports: [FileCellComponent],
	imports: [CommonModule, IconModule, AvatarModule],
	providers: [FileService]
})
export class FileCellModule {}
