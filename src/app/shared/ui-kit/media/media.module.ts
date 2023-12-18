import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MediaComponent } from './media.component'

@NgModule({
	declarations: [MediaComponent],
	exports: [MediaComponent],
	imports: [CommonModule]
})
export class MediaModule {}
