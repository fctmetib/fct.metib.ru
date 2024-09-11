import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ToasterComponent} from './toaster.component'
import {IconModule} from '../ref-icon/icon.module'
import {ToasterPointComponent} from './components/toaster-point/toaster-point.component'
import {ButtonModule} from '../button/button.module'

@NgModule({
	declarations: [ToasterComponent, ToasterPointComponent],
	exports: [ToasterComponent, ToasterPointComponent],
	imports: [CommonModule, IconModule, ButtonModule]
})
export class ToasterModule {}
