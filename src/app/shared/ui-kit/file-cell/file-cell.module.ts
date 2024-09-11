import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FileCellComponent} from './file-cell.component'
import {IconModule} from '../ref-icon/icon.module'
import {FileService} from '../../services/common/file.service'
import {AvatarModule} from '../avatar/avatar.module'
import {ButtonModule} from '../button/button.module'
import {LoaderModule} from '../loader/loader.module'

@NgModule({
	declarations: [FileCellComponent],
	exports: [FileCellComponent],
	imports: [CommonModule, IconModule, AvatarModule, ButtonModule, LoaderModule],
	providers: [FileService]
})
export class FileCellModule {}
