import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {environment} from 'src/environments/environment'

@Injectable()
export class FeedService {
  constructor(private http: HttpClient) {}

  getFeed(): Observable<any> {
    const url = `${environment.apiUrl}`
    return this.http.get<any>(url)
  }
}
