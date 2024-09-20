import {Inject, Injectable, PLATFORM_ID} from '@angular/core'
import {Resolve, ActivatedRouteSnapshot} from '@angular/router'
import {NewsService} from './news.service'
import {Observable, of} from 'rxjs'
import {switchMap, map, catchError} from 'rxjs/operators'
import {AdvancedNewsInterface} from '../type/news.interface'

@Injectable({
	providedIn: 'root'
})
export class NewsResolver implements Resolve<AdvancedNewsInterface[]> {
	constructor(private newsService: NewsService) {}

	resolve(route: ActivatedRouteSnapshot): Observable<AdvancedNewsInterface[]> {
		const id = route.paramMap.get('id')

		if (!id) {
			return of([])
		}

		return this.newsService.getNewsById(id).pipe(
			switchMap(news => {
				return this.newsService
					.getNewsImage(news.ID)
					.pipe(map(image => [{...news, Image: image}]))
			}),
			catchError(error => {
				console.error('Ошибка в NewsResolver:', error)
				return of([])
			})
		)
	}
}
