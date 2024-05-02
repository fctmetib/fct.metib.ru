import {DatePipe} from '@angular/common'
import {Component, Inject, OnInit} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {error} from 'console'
import {Properties} from 'csstype'
import {BehaviorSubject, concatMap, finalize, switchMap, tap} from 'rxjs'
import {DocumentReq} from 'src/app/client/modules/requests/interfaces/request.interface'
import {NewsService} from 'src/app/public/service/news.service'
import {AdvancedNewsInterface} from 'src/app/public/type/news.interface'
import {FileDnd} from 'src/app/shared/ui-kit/drag-and-drop/interfaces/drop-box.interface'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'

@Component({
	selector: 'mib-cabinet-create-news-drawer',
	templateUrl: './cabinet-create-news-drawer.component.html',
	styleUrls: ['./cabinet-create-news-drawer.component.scss']
})
export class CabinetCreateNewsDrawerComponent implements OnInit {
	// public isSubmitting$ = new BehaviorSubject<boolean>(false)
	public loading$ = new BehaviorSubject<boolean>(false)

	public singleNews: AdvancedNewsInterface
	public isNewImage: boolean
	public newImage: string = ''
	public uploadNewImage = new BehaviorSubject<string>('')
	public nextID: number = 0
	public imageFile: File

	public form: FormGroup

	// public formNewsDate = new FormControl(null, [Validators.required])

	public defaultSkeleton: Properties = {
		borderRadius: '8px',
		width: '100%'
	}

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: DrawerData,
		public dialogRef: MatDialogRef<CabinetCreateNewsDrawerComponent>,
		private newsService: NewsService,
		private fb: FormBuilder,
		public datepipe: DatePipe
	) {}

	get newsID() {
		return this.data?.data.id
	}

	ngOnInit(): void {
		if (this.newsID) {
			this.getSingleNews()
			this.isNewImage = true
		} else {
			this.isNewImage = false
		}
		this.initForms()
		this.getLastID()
		// this.watchForms()
	}

	getLastID() {
		this.newsService.getNews(1).subscribe(data => {
			this.nextID = data[0].ID + 1
			console.log('this.nextID :>> ', this.nextID)
		})
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
						this.form
							.get('formNewsDate')
							.setValue(this.datepipe.transform(data.Date, 'yyyy-MM-dd'))
				})
			)
			.subscribe(news => {
				this.singleNews = {...news, Image: img}
			})
	}

	createNews() {
		this.loading$.next(true)
		const res = this.form.getRawValue()
		let newsData = {
			ID: this.nextID,
			Title: res.formNewsTitle,
			Date: new Date(res.formNewsDate).toISOString(),
			FileReference: res.formNewsTitle,
			Text: res.formNewsText
		}
		this.newsService
			.addNewsItem(newsData)
			.pipe(
				switchMap(() => {
					return this.newsService.addNewsImage(this.imageFile, this.nextID)
				}),
				finalize(() => this.loading$.next(false))
			)
			.subscribe(() => {
				this.dialogRef.close(this.nextID)
			})
	}

	updateNews(id) {
		this.loading$.next(true)
		const res = this.form.getRawValue()
		const newsData = {
			ID: id,
			Title: res.formNewsTitle,
			Date: new Date(res.formNewsDate).toISOString(),
			FileReference: res.formNewsTitle,
			Text: res.formNewsText
		}
		this.newsService
			.updateNewsItem(newsData, id)
			.pipe(
				switchMap(() => {
					return this.newsService.addNewsImage(this.imageFile, id)
				}),
				finalize(() => this.loading$.next(false))
			)
			.subscribe(() => {
				this.dialogRef.close(id)
			})
	}

	closeDrawer() {
		this.dialogRef.close()
	}

	private initForms() {
		this.form = this.fb.group({
			formNewsTitle: [null, [Validators.required]],
			formNewsText: [null, [Validators.required]],
			formNewsDate: [null, [Validators.required]]
		})
	}

	// private watchForms() {
	// 	this.formNewsDate.valueChanges
	// 		.pipe(
	// 			tap(data => {
	// 				// if (data) {
	// 				this.formNewsDate.setValue(data)
	// 				console.log('formNewsDate.valueChanges-data :>> ', data)
	// 				// } else {
	// 				// 	console.log('data formnewsData reset :>> ', data)
	// 				// 	this.formNewsDate.reset()
	// 				// }
	// 			}),
	// 			filter(Boolean),
	// 			takeUntil(this.au.destroyer)
	// 		)
	// 		.subscribe()
	// }

	deleteNews(id) {
		if (this.uploadNewImage) {
			this.isNewImage = false
		} else this.isNewImage = true
		this.uploadNewImage.next('')
	}

	addImage() {
		if (this.uploadNewImage) {
			this.isNewImage = false
		} else this.isNewImage = true
		this.uploadNewImage.next('')
	}

	onDocumentLoad({file, url}: FileDnd) {
		if (file) {
			this.imageFile = file
		}
		this.uploadNewImage.next(url)
		this.uploadNewImage.subscribe(() => {
			this.newImage = this.uploadNewImage.value
		})
	}
}
