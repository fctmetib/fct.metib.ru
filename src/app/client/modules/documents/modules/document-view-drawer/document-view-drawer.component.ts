import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {Properties} from 'csstype'
import {
	BehaviorSubject,
	catchError,
	defer,
	finalize,
	of,
	switchMap,
	tap
} from 'rxjs'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {DocumentViewsDrawerData} from './interfaces/document-views-drawer.data'
import {DocumentsService} from '../../services/documents.service'
import {
	downloadBase64File,
	ToolsService
} from 'src/app/shared/services/tools.service'
import {
	DocumentRes,
	DocumentSign
} from '../../../requests/interfaces/request.interface'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'

@Component({
	selector: 'mib-new-documents-views-drawer',
	templateUrl: './document-view-drawer.component.html',
	styleUrls: ['./document-view-drawer.component.scss']
})
export class DocumentViewDrawerComponent implements OnInit {
	public loading$ = new BehaviorSubject<boolean>(false)
	public isSigning$ = new BehaviorSubject<boolean>(false)
	public isDownloading$ = new BehaviorSubject<boolean>(false)
	public isDownloadZip$ = new BehaviorSubject<boolean>(false)

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

	public signs: DocumentSign[] = []

	public size = 'm'
	public document: DocumentRes

	constructor(
		@Inject(MAT_DIALOG_DATA)
		public data: DrawerData<DocumentViewsDrawerData>,
		public toolsService: ToolsService,
		public dialogRef: MatDialogRef<DocumentViewDrawerComponent>,
		private documentsService: DocumentsService,
		private toaster: ToasterService
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
				switchMap(() =>
					this.documentsService.getSign(this.document.DocumentID).pipe(
						tap(signs => {
							this.signs = signs
						})
					)
				),
				finalize(() => {
					this.loading$.next(false)
				})
			)
			.subscribe()
	}

	sign() {
		this.isSigning$.next(true)
		this.documentsService.signModal(
        this.documentsService.sign(this.documentId).pipe(
          tap(() => {
            this.toaster.show('success', 'Документ подписан!')
          }),
        ),
        this.isSigning$
      )
			.pipe(
				catchError(err => {
          console.log('Что-то пошло не так!')
          this.toaster.show('failure', 'Что-то пошло не так!')
					return of(err)
				})
			)
			.subscribe()
	}

	downloadFile() {
		this.isDownloading$.next(true)
		this.documentsService
			.getDocumentContent(this.documentId)
			.pipe(
				tap(data => {
					downloadBase64File(data, this.document.Title)
				}),
				finalize(() => {
					this.isDownloading$.next(false)
				})
			)
			.subscribe()
	}

	downloadZip() {
		this.isDownloadZip$.next(true)
		this.documentsService
			.getDocumentZip(this.documentId)
			.pipe(
				tap(data => {
					console.log('data :>> ', data)
					downloadBase64File(data, 'halo')
				}),
				finalize(() => {
					this.isDownloadZip$.next(false)
				})
			)
			.subscribe()
	}
}
