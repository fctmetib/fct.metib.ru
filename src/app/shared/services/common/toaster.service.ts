import {Injectable} from '@angular/core'
import {BehaviorSubject, Observable, filter} from 'rxjs'
import {Toaster} from '../../ui-kit/toaster/interfaces/toaster.interface'
import {ToasterPointType} from '../../ui-kit/toaster/interfaces/toaster-point.interface'

@Injectable({
	providedIn: 'root'
})
export class ToasterService {
	subject: BehaviorSubject<Toaster>
	toast$: Observable<Toaster>
	constructor() {
		this.subject = new BehaviorSubject<Toaster>(null)
		this.toast$ = this.subject.asObservable().pipe(
			filter(toast => {
				return toast !== null
			})
		)
	}

	show(
		type: ToasterPointType = 'success',
		title?: string,
		description?: string,
		contrast: boolean = true,
		showDescription?: boolean,
		delay?: number
	) {
		this.subject.next({
			type,
			title,
			description,
			contrast,
			showDescription,
			delay
		})
	}
}
