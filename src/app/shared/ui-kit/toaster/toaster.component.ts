import {Component, Input} from '@angular/core'
import {
	ToasterPointDevice,
	ToasterPointType
} from './interfaces/toaster-point.interface'

@Component({
	selector: 'mib-toaster',
	templateUrl: './toaster.component.html',
	styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent {
	@Input() showDescription: boolean = true
	@Input() type: ToasterPointType = 'success'
	@Input() device: ToasterPointDevice = 'mobile'
}
