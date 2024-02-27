import {Component} from '@angular/core'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'

@Component({
	selector: 'mib-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
	constructor(private toaster: ToasterService) {}

	public getFunding() {
		console.log('get funding')
	}
}
