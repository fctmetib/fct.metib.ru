import { Injectable } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { RefIconService } from '../ui-kit/ref-icon/services/ref-icon.service'

@Injectable({
	providedIn: 'root'
})
export class IconsService {
	constructor(
		private domSanitizer: DomSanitizer,
		private refIconService: RefIconService
	) {}

	public icons: string[] = [
		'fi_chevron-left',
		'fi_chevron-right',
		'fi_search',
		'fi_x',
		'fi_menu',
		'fi_chevron-down',
		'logotype',
		'fi_maximize-2',
		'fi_info',
		'fi_check',
    'fi_more-vertical'
	]

	public async initIcons(): Promise<void> {
		// Пример
		for (const icon of this.icons) {
			await this.refIconService.registerIconFromAssets(
				icon,
				`assets/icons/ui-kit-icons/${icon}.svg`
			)
		}
	}
}
