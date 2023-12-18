import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MediaComponent } from './media.component'
import { RefIconModule } from '../ref-icon/ref-icon.module'

@NgModule({
	declarations: [MediaComponent],
	exports: [MediaComponent],
	imports: [CommonModule, RefIconModule]
})
export class MediaModule {}
