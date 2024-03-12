import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {NewsInterface} from '../type/news.interface'
import {environment} from 'src/environments/environment'

@Injectable()
export class NewsService {
	constructor(private http: HttpClient) {}

	// https://api-factoring-test02.metib.ru/api/v{version}/news/top/3

	public getNews(newsCount: number): Observable<NewsInterface> {
		const url = `${environment.apiUrl}/v1/news/top/${newsCount}`
		return this.http.get<NewsInterface>(url)
	}

	// https://api-factoring-test02.metib.ru/api/v{version}/news/123/image

	public getNewsImage(newsId: number): Observable<any> {
		const url = `${environment.apiUrl}/v1/news/${newsId}/image`
		return this.http.get<any>(url)
	}
	// public getNewsImage(newsId: number): Observable<string> {
	// 	const url = `${environment.apiUrl}/v1/news/${newsId}/image`
	// 	return this.http.get<string>(url)
	// }

	public getNewsById(id: string): Observable<NewsInterface> {
		const url = `${environment.apiUrl}/news/${id}`
		return this.http.get<NewsInterface>(url)
	}

	// https://api-factoring-test02.metib.ru/api/v{version}/news

	public getNewsList(): Observable<NewsInterface[]> {
		const url = `${environment.apiUrl}/v1/news`
		return this.http.get<NewsInterface[]>(url)
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
