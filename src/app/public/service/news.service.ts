import {Injectable} from '@angular/core'
import {Observable, map, switchMap} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {NewsInterface} from '../type/news.interface'
import {environment} from 'src/environments/environment'
import {blob} from 'stream/consumers'

@Injectable()
export class NewsService {
	constructor(private http: HttpClient) {}

	public getAllNews() {
		const url = `${environment.apiUrl}/v1/news/`
		return this.http.get<NewsInterface[]>(url)
	}

	// https://api-factoring-test02.metib.ru/api/v{version}/news/top/3

	public getNews(newsCount: number): Observable<NewsInterface[]> {
		const url = `${environment.apiUrl}/v1/news/top/${newsCount}`
		return this.http.get<NewsInterface[]>(url)
	}

	// https://api-factoring-test02.metib.ru/api/v{version}/news/123/image

	public getNewsImage(newsId: number): Observable<string> {
		const url = `${environment.apiUrl}/v1/news/${newsId}/image`
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
			})
		)
	}

	// https://api-factoring-test02.metib.ru/api/v{version}/news/33

	public getNewsById(newsId: string): Observable<NewsInterface> {
		const url = `${environment.apiUrl}/v1/news/${newsId}`
		return this.http.get<NewsInterface>(url)
	}

	// https://api-factoring-test02.metib.ru/api/v{version}/news

	public getNewsList(): Observable<NewsInterface[]> {
		const url = `${environment.apiUrl}/v1/news`
		return this.http.get<NewsInterface[]>(url)
	}

	// https://api-factoring-test02.metib.ru/api/v{version}/news

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

	// https://api-factoring-test02.metib.ru/api/v{version}/news/22

	updateNewsItem(
		data: NewsInterface,
		newsId: string
	): Observable<NewsInterface> {
		let url = `${environment.apiUrl}/v1/news/${newsId}`
		return this.http.put<NewsInterface>(url, data)
	}

	// https://api-factoring-test02.metib.ru/api/v{version}/news/22

	removeNewsItem(newsId: number): Observable<any> {
		let url = `${environment.apiUrl}/v1/news/${newsId}`
		return this.http.delete<any>(url)
	}

	// public getNews(newsCount: number): Observable<NewsInterface[]> {
	//   const url = `${environment.apiUrl}/news/top/${newsCount}`;
	//   return this.http.get<NewsInterface[]>(url);
	// }

	// public getNewsById(id: string): Observable<NewsInterface> {
	//   const url = `${environment.apiUrl}/news/${id}`;
	//   return this.http.get<NewsInterface>(url);
	// }

	// public getNewsList(): Observable<NewsInterface[]> {
	//   const url = `${environment.apiUrl}/news`;
	//   return this.http.get<NewsInterface[]>(url);
	// }
}
