import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { IDraftList, IHistoryList, IQueryList } from './data.models'
import { draftlist, historylist, querylist } from './data'

@Injectable({
	providedIn: 'root'
})
export class DataService {
	getRequestList(): Observable<IQueryList[]> {
		return of(querylist)
	}

	getDraftList(): Observable<IDraftList[]> {
		return of(draftlist)
	}

	getHistoryList(): Observable<IHistoryList[]> {
		return of(historylist)
	}
}
