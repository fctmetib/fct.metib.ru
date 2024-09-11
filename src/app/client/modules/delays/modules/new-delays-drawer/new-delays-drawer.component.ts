import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'
import {Properties} from 'csstype'
import {BehaviorSubject} from 'rxjs'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'

@Component({
	selector: 'mib-new-delays-drawer',
	templateUrl: './new-delays-drawer.component.html',
	styleUrls: ['./new-delays-drawer.component.scss']
})
export class NewDelaysDrawerComponent {
	public loading$ = new BehaviorSubject<boolean>(false)

	public skeletonWithoutUnderline: Properties = {
		height: '48px',
		width: '100%'
	}

	public skeleton: Properties = {
		...this.skeletonWithoutUnderline,
		borderBottom: '1px solid var(--wgr-tertiary)'
	}

	public defaultSkeleton: Properties = {
		borderRadius: '8px',
		width: '100%'
	}

	public PAGINATOR_ITEMS_PER_PAGE = 5
	public PAGINATOR_PAGE_TO_SHOW = 5
	public currentPage$ = new BehaviorSubject<number>(1)

	public datas = {
		summ: 12345000,
		name: 'Магнит',
		ids: '213/324a-23',
		number: 3
	}
	public todayIs: Date = new Date()

	constructor(
		private toaster: ToasterService,
		public dialogRef: MatDialogRef<NewDelaysDrawerComponent>
	) {}

	onPageChange(page: number) {
		const startIndex = (page - 1) * this.PAGINATOR_ITEMS_PER_PAGE
		const endIndex = startIndex + this.PAGINATOR_ITEMS_PER_PAGE

		console.log('page :>> ', page)
	}
}
