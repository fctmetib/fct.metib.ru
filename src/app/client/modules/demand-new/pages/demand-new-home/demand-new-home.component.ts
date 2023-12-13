import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { IQueryList } from '../mock-data-service/data.models'
import { DataService } from '../mock-data-service/data.srrvice'

@Component({
	selector: 'mib-demand-new-home',
	templateUrl: './demand-new-home.component.html',
	styleUrls: ['./demand-new-home.component.scss']
})
export class DemandNewHomeComponent implements OnInit {
	requestList$: IQueryList[] = []

	constructor(private requestList: DataService) {}

	ngOnInit(): void {
		this.requestList
			.getRequestList()
			.subscribe(list => (this.requestList$ = list))
	}
}
