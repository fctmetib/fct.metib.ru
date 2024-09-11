import {DatePipe} from '@angular/common'
import {Component, Inject, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {Properties} from 'csstype'
import {
	BehaviorSubject,
	catchError,
	finalize,
	map,
	of,
	switchMap,
	tap
} from 'rxjs'
import {NewsService} from 'src/app/public/service/news.service'
import {AdvancedNewsInterface} from 'src/app/public/type/news.interface'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'
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
	public isNewImage: boolean
	public newImage: string = ''
	public uploadNewImage = new BehaviorSubject<string>('')
	public nextID: number = 0
	public imageFile: File

	public form: FormGroup

	public defaultSkeleton: Properties = {
		borderRadius: '8px',
		width: '100%'
	}

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: DrawerData,
		public dialogRef: MatDialogRef<CabinetCreateNewsDrawerComponent>,
		private newsService: NewsService,
		private fb: FormBuilder,
		public datepipe: DatePipe,
		private toaster: ToasterService
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
	}

	getLastID() {
		this.newsService.getNews(1).subscribe(data => {
			this.nextID = data[0].ID + 1
		})
	}

	getSingleNews() {
		this.loading$.next(true)

		this.newsService
			.getNewsImage(this.newsID)
			.pipe(
				switchMap(image =>
					this.newsService.getNewsById(this.newsID).pipe(
						finalize(() => this.loading$.next(false)),
						tap(data => {
							this.form.get('formNewsTitle').setValue(data.Title)
							this.form.get('formNewsText').setValue(data.Text)
							this.form
								.get('formNewsDate')
								.setValue(this.datepipe.transform(data.Date, 'yyyy-MM-dd'))
						}),
						map(news => ({...news, Image: image}))
					)
				)
			)
			.subscribe(singleNews => {
				this.singleNews = singleNews
			})
	}

	createNews() {
		this.isSubmitting$.next(true)
		const res = this.form.getRawValue()

		const formattedText = this.formatText(res.formNewsText)

		let newsData = {
			ID: this.nextID,
			Title: res.formNewsTitle,
			Date: new Date(res.formNewsDate).toISOString(),
			FileReference: res.formNewsTitle,
			Text: formattedText
		}

		this.newsService
			.addNewsItem(newsData)
			.pipe(
				switchMap(() => {
					return this.newsService.addNewsImage(this.imageFile, this.nextID)
				}),
				catchError(error => {
					console.error('Ошибка при отправке данных:', error)
					this.toaster.show(
						'failure',
						'Произошла ошибка при отправке данных!',
						'',
						true,
						false,
						2500
					)
					return of(null)
				}),
				finalize(() => this.isSubmitting$.next(false))
			)
			.subscribe(() => {
				this.dialogRef.close(this.nextID)
			})
	}

	updateNews(id) {
		this.isSubmitting$.next(true)
		const res = this.form.getRawValue()

		const formattedText = this.formatText(res.formNewsText)

		const newsData = {
			ID: id,
			Title: res.formNewsTitle,
			Date: new Date(res.formNewsDate).toISOString(),
			FileReference: res.formNewsTitle,
			Text: formattedText
		}

		this.newsService
			.updateNewsItem(newsData, id)
			.pipe(
				switchMap(() => {
					if (this.imageFile) {
						return this.newsService.addNewsImage(this.imageFile, id)
					}
					this.dialogRef.close(id)
					return of(null)
				}),
				catchError(error => {
					console.error('Ошибка при обновлении новости:', error)
					this.toaster.show(
						'failure',
						'Произошла ошибка при отправке данных!',
						'',
						true,
						false,
						2500
					)
					return of(null)
				}),
				finalize(() => this.isSubmitting$.next(false))
			)
			.subscribe(() => {
				this.dialogRef.close(id)
			})
	}

	formatText(text: string): string {
		return text
			.replace(/<b>(.*?)<\/b>/g, '<strong>$1</strong>') // Заменить <b> на <strong>
			.replace(/\n/g, '<br>') // Заменить новую строку на <br>
			.replace(/<ul>/g, '<ul style="list-style-type: square;">')
			.replace(
				/<a href="(.*?)">(.*?)<\/a>/g,
				'<a href="$1" target="_blank">$2</a>'
			)
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
