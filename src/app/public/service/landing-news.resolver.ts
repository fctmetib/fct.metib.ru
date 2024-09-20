import {Injectable} from '@angular/core'
import {Resolve} from '@angular/router'
import {NewsService} from './news.service'
import {Observable, of, zip} from 'rxjs'
import {switchMap, map, catchError} from 'rxjs/operators'
import {AdvancedNewsInterface} from '../type/news.interface'

@Injectable({
	providedIn: 'root'
})
export class LandingNewsResolver implements Resolve<AdvancedNewsInterface[]> {
	private newsNumberCount: number = 4

	constructor(private newsService: NewsService) {}

	resolve(): Observable<AdvancedNewsInterface[]> {
		return this.newsService.getNews(this.newsNumberCount).pipe(
			switchMap(news => {
				if (!news || news.length === 0) {
					return of([])
				}

				const newsWithImages$ = news.map(item =>
					this.newsService.getNewsImage(item.ID).pipe(
						map(image => ({...item, Image: image})),
						catchError(error => {
							console.error('Error fetching image:', error)
							return of({
								...item,
								Image: 'assets/images/Image_not_available.png'
							})
						})
					)
				)

				return zip(...newsWithImages$)
			}),
			catchError(error => {
				console.error('Error fetching news:', error)
				return of([])
			})
		)
	}
}
