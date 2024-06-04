import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {BreadcrumbComponent} from './breadcrumb.component'
import {IconModule} from '../ref-icon/icon.module'

@NgModule({
	declarations: [BreadcrumbComponent],
	imports: [CommonModule, IconModule],
	exports: [BreadcrumbComponent]
})
export class BreadcrumbModule {}
