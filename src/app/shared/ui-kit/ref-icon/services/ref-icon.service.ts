import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferState, makeStateKey, StateKey } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';
import { IconsService } from 'src/app/shared/services/icons.servcie';

const BASE_URL_KEY = makeStateKey<string>('BASE_URL');
const ICONS_KEY: StateKey<{ [key: string]: string }> = makeStateKey<{ [key: string]: string }>('icons');

@Injectable({
  providedIn: 'root'
})
export class RefIconService {
  private icons: { [key: string]: string } = {};
  private loadingIconsPromise: Promise<void> | null = null;

  constructor(
    private http: HttpClient,
    private transferState: TransferState,
	private iconsService: IconsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (!this.isServer()) {
      const initialIcons = this.transferState.get(ICONS_KEY, null);
      if (initialIcons) {
        this.icons = initialIcons;
      }
    }
  }

  public async getIcon(name: string): Promise<string> {
    if (this.icons[name]) {
      return this.icons[name];
    }

    await this.loadAllIconsOnce();
    return this.icons[name] || '<svg></svg>';
  }

  private async loadAllIconsOnce(): Promise<void> {
    if (this.loadingIconsPromise) {
      return this.loadingIconsPromise;
    }

    this.loadingIconsPromise = this.loadAllIcons();
    await this.loadingIconsPromise;
  }

  public async initIcons(): Promise<void> {
	try {
		const url = `${this.getBaseUrl()}/assets/icons/icons.json`;
		console.log('Requesting icons from:', url);
  
		const allIcons = await this.http
		  .get<{ [key: string]: string }>(url)
		  .toPromise();
  
		this.icons = allIcons || {};
  
		if (this.isServer()) {
		  this.transferState.set(ICONS_KEY, this.icons);
		}
	  } catch (error) {
		console.error('Failed to load icons:', error);
	  }
  }

  private async loadAllIcons(): Promise<void> {
	try {
	  const isDevMode = !this.isServer();
	  console.log('Dev mode:', isDevMode);
  
	  if (isDevMode) {
		const iconsDir = '/assets/icons/ui-kit-icons/';
		const iconNames = this.iconsService.icons;

		for (const iconName of iconNames) {
		  const iconUrl = `${iconsDir}${iconName}.svg`;
		  const svgContent = await this.http.get(iconUrl, { responseType: 'text' }).toPromise();
		  this.icons[iconName] = svgContent;
		}
		console.log('Client. Icons:', this.icons);
	  } else {
		const url = `${this.getBaseUrl()}/assets/icons/icons.json`;

		const allIcons = await this.http.get<{ [key: string]: string }>(url).toPromise();
		console.log('Server. Icons:', allIcons);
		this.icons = allIcons || {};
	  }
  
	  if (this.isServer()) {
		this.transferState.set(ICONS_KEY, this.icons);
		console.log('ICONS_KEY:', this.transferState.get(ICONS_KEY, null));
	  }
	} catch (error) {
	  console.error('Failed to load icons:', error);
	}
  }

  private getBaseUrl(): string {
	// TODO: Изменить на динамичный вид, второй параметр null
	// const baseUrl = this.transferState.get(BASE_URL_KEY, "https://factoring.metallinvestbank.ru");
	// if (baseUrl) {
	//   return baseUrl;
	// }
  
	if (!this.isServer() && typeof window !== 'undefined') {
	  return window.location.origin;
	}
  
	return 'https://factoring.metallinvestbank.ru';
  }  

  private isServer(): boolean {
    return isPlatformServer(this.platformId);
  }
}
