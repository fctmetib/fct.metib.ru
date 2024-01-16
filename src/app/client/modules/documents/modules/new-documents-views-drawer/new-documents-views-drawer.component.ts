import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {Properties} from 'csstype'
import {BehaviorSubject, finalize, tap} from 'rxjs'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {NewDocumentsViewsDrawerInterface} from './interfaces/new-documents-views-drawer.interface'
import {DocumentsService} from '../../services/documents.service'
import {ClientDocumentsInterface} from '../../types/common/client-documents.interface'
import {ToolsService} from 'src/app/shared/services/tools.service'

@Component({
	selector: 'mib-new-documents-views-drawer',
	templateUrl: './new-documents-views-drawer.component.html',
	styleUrls: ['./new-documents-views-drawer.component.scss']
})
export class NewDocumentsViewsDrawerComponent implements OnInit {
	public loading$ = new BehaviorSubject<boolean>(false)

	public skeletonWithoutUnderline: Properties = {
		borderRadius: '8px',
		height: '48px',
		width: '100%'
	}

	public skeleton: Properties = {
		...this.skeletonWithoutUnderline,
		borderBottom: '1px solid var(--wgr-tertiary)'
	}

	public skeletonTitle: Properties = {
		...this.skeletonWithoutUnderline,
		height: '60px'
	}

	public skeletonDescription: Properties = {
		...this.skeletonWithoutUnderline,
		height: '34px'
	}

	public skeletonTabGroup: Properties = {
		...this.skeletonWithoutUnderline,
		height: '271px'
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

	public document: ClientDocumentsInterface

	constructor(
		@Inject(MAT_DIALOG_DATA)
		public data: DrawerData<NewDocumentsViewsDrawerInterface>,
		public toolsService: ToolsService,
		public dialogRef: MatDialogRef<NewDocumentsViewsDrawerComponent>,
		private documentsService: DocumentsService
	) {}

	ngOnInit(): void {
		this.getCurrentDocument()
	}

	get documentId() {
		return this.data.data.documentID
	}

	getCurrentDocument() {
		this.loading$.next(true)
		this.documentsService
			.fetchDocuments()
			.pipe(
				tap(data => {
					this.document = data.find(el => el.DocumentID === this.documentId)
				}),
				finalize(() => {
					this.loading$.next(false)
				})
			)
			.subscribe()
	}
}
