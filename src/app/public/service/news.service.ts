import {Inject, Injectable, PLATFORM_ID} from '@angular/core'
import {Observable, catchError, map, of, switchMap} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {NewsInterface} from '../type/news.interface'
import {environment} from 'src/environments/environment'
import {isPlatformServer} from '@angular/common'

@Injectable({
	providedIn: 'root'
})
export class NewsService {
	constructor(
		private http: HttpClient,
		@Inject(PLATFORM_ID) private platformId: Object
	) {}

	public getAllNews() {
		const url = `${environment.apiUrl}/v1/news/`
		return this.http.get<NewsInterface[]>(url)
	}

	public getNews(newsCount: number): Observable<NewsInterface[]> {
		const url = `${environment.apiUrl}/v1/news/top/${newsCount}`
		return this.http.get<NewsInterface[]>(url)
	}

	// https://api-factoring-test02.metib.ru/api/v{version}/news/123/image

	public getNewsImage(newsId: number): Observable<string> {
		const url = `${environment.apiUrl}/v1/news/${newsId}/image`
		if (isPlatformServer(this.platformId)) {
			return this.http.get(url, {responseType: 'arraybuffer'}).pipe(
				map(arrayBuffer => {
					const base64 = Buffer.from(arrayBuffer).toString('base64')
					const mimeType = 'image/jpeg'
					return `data:${mimeType};base64,${base64}`
				}),
				catchError(error => {
					return of('')
				})
			)
		} else {
			return this.http.get(url, {responseType: 'blob'}).pipe(
				switchMap(blob => {
					return new Observable<string>(observer => {
						const reader = new FileReader()
						reader.readAsDataURL(blob)
						reader.onloadend = function () {
							observer.next(reader.result as string)
							observer.complete()
						}
						reader.onerror = function (error) {
							observer.error(error)
						}
					})
				}),
				catchError(error => {
					return of('')
				})
			)
		}
	}

	public getNewsById(newsId: string): Observable<NewsInterface> {
		const url = `${environment.apiUrl}/v1/news/${newsId}`
		return this.http.get<NewsInterface>(url)
	}

	public getNewsList(): Observable<NewsInterface[]> {
		const url = `${environment.apiUrl}/v1/news`
		return this.http.get<NewsInterface[]>(url)
	}

	addNewsItem(data: NewsInterface): Observable<NewsInterface> {
		let url = `${environment.apiUrl}/v1/news`
		return this.http.post<NewsInterface>(url, data)
	}

	addNewsImage(file, newsId): Observable<any> {
		var formdata = new FormData()
		formdata.append('', file)

		let url = `${environment.apiFileUploadUrl}/v1/news/${newsId}/image`
		return this.http.post<string>(url, formdata)
	}

	updateNewsItem(
		data: NewsInterface,
		newsId: string
	): Observable<NewsInterface> {
		let url = `${environment.apiUrl}/v1/news/${newsId}`
		return this.http.put<NewsInterface>(url, data)
	}

	removeNewsItem(newsId: number): Observable<any> {
		let url = `${environment.apiUrl}/v1/news/${newsId}`
		return this.http.delete<any>(url)
	}
}
