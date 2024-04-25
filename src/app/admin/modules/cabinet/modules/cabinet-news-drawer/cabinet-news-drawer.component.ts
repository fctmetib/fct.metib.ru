import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {
	DrawerData,
	DrawerStateEnum
} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {CabinetCreateNewsDrawerService} from '../cabinet-create-news-drawer/cabinet-create-news-drawer.service'
import {NewsService} from 'src/app/public/service/news.service'
import {BehaviorSubject, concatMap, finalize} from 'rxjs'
import {AdvancedNewsInterface} from 'src/app/public/type/news.interface'
import {Properties} from 'csstype'

@Component({
	selector: 'mib-cabinet-news-drawer',
	templateUrl: './cabinet-news-drawer.component.html',
	styleUrls: ['./cabinet-news-drawer.component.scss']
})
export class CabinetNewsDrawerComponent implements OnInit {
	public loading$ = new BehaviorSubject<boolean>(false)
	public singleNews: AdvancedNewsInterface

	public defaultSkeleton: Properties = {
		borderRadius: '8px',
		width: '100%'
	}

	constructor(
		private newsService: NewsService,
		public dialogRef: MatDialogRef<CabinetNewsDrawerComponent>,
		private сabinetEditNewsDrawerService: CabinetCreateNewsDrawerService,
		@Inject(MAT_DIALOG_DATA) public data: DrawerData
	) {}

	get newsID() {
		return this.data?.data.id
	}

	ngOnInit(): void {
		this.getSingleNews()
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
			.subscribe(news => {
				this.singleNews = {...news, Image: img}
			})
	}

	editNews() {
		console.log('edit news >>>')
		this.dialogRef.close()
		this.openEditNewsDrawer()
	}

	removeNews() {
		console.log('remove news >>>')
	}

	openEditNewsDrawer() {
		this.сabinetEditNewsDrawerService
			.open({state: DrawerStateEnum.CREATE})
			.afterClosed()
			.subscribe()
	}
}
