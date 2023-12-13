import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { IQueryList } from './data.models'
import { querylist } from './data'

@Injectable({
	providedIn: 'root'
})
export class DataService {
	getRequestList(): Observable<IQueryList[]> {
		return of(querylist)
	}
}
