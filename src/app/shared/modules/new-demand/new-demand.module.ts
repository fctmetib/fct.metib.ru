import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NewDemandComponent } from './new-demand.component'

@NgModule({
	declarations: [NewDemandComponent],
	exports: [NewDemandComponent],
	imports: [CommonModule]
})
export class NewDemandModule {}
