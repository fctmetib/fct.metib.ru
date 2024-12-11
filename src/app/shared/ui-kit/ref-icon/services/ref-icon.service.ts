import {Inject, Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {TransferState, makeStateKey} from '@angular/platform-browser'

@Injectable({
	providedIn: 'root'
})
export class RefIconService {
	private icons: {[key: string]: string} = {}
	private readonly ICONS_KEY = makeStateKey<{[key: string]: string}>('icons')

	constructor(
		private http: HttpClient,
		private transferState: TransferState,
		@Inject('BASE_URL') private baseUrl: string
	) {
		const initialIcons = this.transferState.get(this.ICONS_KEY, null)
		if (initialIcons) {
			this.icons = initialIcons
		}
	}

	public async getIcon(name: string): Promise<string> {
		if (this.icons[name]) {
			return this.icons[name]
		}

		await this.loadAllIcons()
		return this.icons[name] || '<svg></svg>'
	}

  private async loadAllIcons(): Promise<void> {
    try {
      const url = `${this.baseUrl}/assets/icons/icons.json`;
	  console.log("URL: ", url)
      const allIcons = await this.http
        .get<{ [key: string]: string }>(url)
        .toPromise();
      this.icons = allIcons || {};
    } catch (error) {
      console.error('Failed to load icons:', error);
    }
  }
}
