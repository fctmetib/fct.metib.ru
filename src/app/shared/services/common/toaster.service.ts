import {Injectable} from '@angular/core'
import {BehaviorSubject} from 'rxjs'
import {
	Toaster,
	ToasterType
} from '../../ui-kit/toaster/interfaces/toaster.interface'

@Injectable({
	providedIn: 'root'
})
export class ToasterService {
	subject: BehaviorSubject<Toaster> = new BehaviorSubject<Toaster>(null)

	constructor() {}

	show(
		type: ToasterType,
		title?: string,
		description?: string,
		delay?: number
	) {
		this.subject.next({type, title, description, delay})
	}
}
