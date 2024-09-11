import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MediaComponent} from './media.component'
import {IconModule} from '../ref-icon/icon.module'
import {RouterLink} from '@angular/router'

@NgModule({
	declarations: [MediaComponent],
	exports: [MediaComponent],
	imports: [CommonModule, IconModule]
})
export class MediaModule {}
