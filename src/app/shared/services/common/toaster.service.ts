import {Injectable} from '@angular/core'
import {BehaviorSubject} from 'rxjs'
import {Toaster} from '../../ui-kit/toaster/interfaces/toaster.interface'
import {ToasterPointType} from '../../ui-kit/toaster/interfaces/toaster-point.interface'

@Injectable({
	providedIn: 'root'
})
export class ToasterService {
	subject: BehaviorSubject<Toaster> = new BehaviorSubject<Toaster>(null)

	constructor() {}

	show(
		type: ToasterPointType,
		title?: string,
		description?: string,
		delay?: number
	) {
		this.subject.next({type, title, description, delay})
	}
}
