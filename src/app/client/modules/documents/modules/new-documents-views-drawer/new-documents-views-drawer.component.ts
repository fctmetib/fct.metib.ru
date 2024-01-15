import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'
import {Properties} from 'csstype'
import {BehaviorSubject} from 'rxjs'

@Component({
	selector: 'mib-new-documents-views-drawer',
	templateUrl: './new-documents-views-drawer.component.html',
	styleUrls: ['./new-documents-views-drawer.component.scss']
})
export class NewDocumentsViewsDrawerComponent {
	public loading$ = new BehaviorSubject<boolean>(false)

	public skeletonWithoutUnderline: Properties = {
		borderRadius: '8px',
		width: '100%'
	}

	public skeletonTitle: Properties = {
		...this.skeletonWithoutUnderline,
		height: '60px'
	}

	public skeletonTags: Properties = {
		...this.skeletonWithoutUnderline,
		height: '34px'
	}

	public skeletonTable: Properties = {
		...this.skeletonWithoutUnderline,
		borderBottom: '1px solid var(--wgr-tertiary)'
	}

	public PAGINATOR_ITEMS_PER_PAGE = 5
	public PAGINATOR_PAGE_TO_SHOW = 5
	public currentPage$ = new BehaviorSubject<number>(1)

	size = 'm'

	public testDate = {
		Name: 'Guaranty1277.pdf',
		Number: 1277,
		Date: {create: '2024-01-11T00:00:00', sign: '2023-07-11T00:00:00'},
		doctype: {
			name: 'копия накладной',
			description: 'Договор поручительства к заявке 1277'
		},
		manager: 'Бирюкова Кристина',
		managerAvatar: './assets/images/woman-avatar.jpg'
	}

	constructor(
		public dialogRef: MatDialogRef<NewDocumentsViewsDrawerComponent>
	) {}
}
