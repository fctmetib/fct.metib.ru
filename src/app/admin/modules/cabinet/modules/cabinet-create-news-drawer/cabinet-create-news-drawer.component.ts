import {DatePipe} from '@angular/common'
import {Component, Inject, OnInit} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {Properties} from 'csstype'
import {
	BehaviorSubject,
	concatMap,
	filter,
	finalize,
	takeUntil,
	tap
} from 'rxjs'
import {DocumentReq} from 'src/app/client/modules/requests/interfaces/request.interface'
import {NewsService} from 'src/app/public/service/news.service'
import {AdvancedNewsInterface} from 'src/app/public/type/news.interface'
import {AutoUnsubscribeService} from 'src/app/shared/services/auto-unsubscribe.service'
import {FileDnd} from 'src/app/shared/ui-kit/drag-and-drop/interfaces/drop-box.interface'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'

@Component({
	selector: 'mib-cabinet-create-news-drawer',
	templateUrl: './cabinet-create-news-drawer.component.html',
	styleUrls: ['./cabinet-create-news-drawer.component.scss']
})
export class CabinetCreateNewsDrawerComponent implements OnInit {
	public isSubmitting$ = new BehaviorSubject<boolean>(false)
	public loading$ = new BehaviorSubject<boolean>(false)

	public singleNews: AdvancedNewsInterface
	// public isNewImage = new BehaviorSubject<boolean>(false)
	public isNewImage: boolean
	public newImage: string = ''
	public uploadNewImage = new BehaviorSubject<string>('')

	public form: FormGroup

	public formNewsDate = new FormControl(null, [Validators.required])

	public defaultSkeleton: Properties = {
		borderRadius: '8px',
		width: '100%'
	}

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: DrawerData,
		public dialogRef: MatDialogRef<CabinetCreateNewsDrawerComponent>,
		private newsService: NewsService,
		private fb: FormBuilder,
		private au: AutoUnsubscribeService,
		public datepipe: DatePipe
	) {}

	get newsID() {
		return this.data?.data.id
	}

	ngOnInit(): void {
		console.log('INIT>')
		if (this.newsID) {
			this.getSingleNews()
			this.isNewImage = true
		} else {
			this.isNewImage = false
		}
		this.initForms()
		this.watchForms()
	}

	getSingleNews() {
		this.loading$.next(true)
		let img = ''
		this.newsService
			.getNewsImage(this.newsID)
			.pipe(
				concatMap(image => {
					img = image
					return this.newsService.getNewsById(this.newsID)
				}),
				finalize(() => {
					this.loading$.next(false)
				})
			)
			.pipe(
				tap(data => {
					this.form.get('formNewsTitle').setValue(data.Title),
						this.form.get('formNewsText').setValue(data.Text),
						this.formNewsDate.setValue(
							this.datepipe.transform(data.Date, 'yyyy-MM-dd')
						)
				})
			)
			.subscribe(news => {
				this.singleNews = {...news, Image: img}
			})
	}

	createNews() {
		console.log('create news >>>')
	}

	closeDrawer() {
		this.dialogRef.close()
	}

	private initForms() {
		this.form = this.fb.group({
			formNewsTitle: [null, [Validators.required]],
			formNewsText: [null, [Validators.required]]
		})
	}

	private watchForms() {
		this.formNewsDate.valueChanges
			.pipe(
				tap(data => {
					console.log('formNewsDate.valueChanges-data :>> ', data)
				}),
				filter(Boolean),
				takeUntil(this.au.destroyer)
			)
			.subscribe()
	}

	deleteNews(id) {
		console.log('delete news', id)
		this.isNewImage = false
	}

	addNewsImage() {
		console.log('add news image')
		this.isNewImage = false
	}

	onDocumentLoad({file, url}: FileDnd) {
		const document: DocumentReq = {
			Description: `description ${file.name}`,
			DocumentTypeID: 40,
			Title: file.name,
			OwnerTypeID: 20,
			Data: url
		}
		this.addDocument(document)
	}

	addDocument(document: DocumentReq) {
		console.log('document :>> ', document)
		if (document) {
			this.uploadNewImage.next(document.Data)
			this.uploadNewImage.subscribe(() => {
				this.newImage = this.uploadNewImage.value
				console.log('this.newImage :>> ', this.newImage)
				// this.isNewImage = true
			})
		}
	}
}
