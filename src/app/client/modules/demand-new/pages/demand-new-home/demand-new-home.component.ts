import { Component, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { IQueryList } from '../mock-data-service/data.models'
import { DataService } from '../mock-data-service/data.srrvice'
import { AnimationService } from 'src/app/shared/animations/animations.service'
import { Properties } from 'csstype'

const ANIMATION_CONFIG = {
	translateDistance: '-3%',
	endOpacity: 0,
	startOpacity: 1,
	duration: 300
}

@Component({
	selector: 'mib-demand-new-home',
	templateUrl: './demand-new-home.component.html',
	styleUrls: ['./demand-new-home.component.scss'],
	animations: [new AnimationService().generateAnimation(ANIMATION_CONFIG)]
})
export class DemandNewHomeComponent implements OnInit {
	requestList$: IQueryList[] = []

	public loading$ = new BehaviorSubject<boolean>(false)

	public skeletonWithoutUnderline: Properties = {
		height: '48px',
		width: '100%'
	}
	public skeleton: Properties = {
		...this.skeletonWithoutUnderline,
		borderBottom: '1px solid var(--wgr-tertiary)'
	}

	public PAGINATOR_ITEMS_PER_PAGE = 7
	public PAGINATOR_PAGE_TO_SHOW = 5
	public currentPage: number = 1

	selectedRequestsCount: number
	severalRequestsChecked: boolean = false

	dutiesVisible: any
	duties: any
	selectedDuties: any

	constructor(private requestList: DataService) {}

	ngOnInit(): void {
		this.requestList
			.getRequestList()
			.subscribe(list => (this.requestList$ = list))
	}
}
