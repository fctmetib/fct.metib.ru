import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DemandDrawerComponent } from './demand-drawer.component'

@NgModule({
	declarations: [DemandDrawerComponent],
	exports: [DemandDrawerComponent],
	imports: [CommonModule]
})
export class DemandDrawerModule {}
