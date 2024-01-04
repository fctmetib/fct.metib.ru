import {Injectable} from '@angular/core'
import {DomSanitizer} from '@angular/platform-browser'
import {RefIconService} from '../ui-kit/ref-icon/services/ref-icon.service'

@Injectable({
	providedIn: 'root'
})
export class IconsService {
	constructor(
		private domSanitizer: DomSanitizer,
		private iconService: RefIconService
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
		'fi_more-vertical',
		'fi_chevrons-right',
		'fi_edit-3',
		'fi_edit',
		'fi_chevron-up',
		'fi_copy',
		'fi_log-out',
		'fi_eye',
		'fi_refresh-ccw',
		'fi_eye-off',
		'fi_frown',
		'fi_plus',
		'fi_file-text',
		'fi_alert-octagon',
		'telegram',
		'vk',
		'whatsapp',
		'fi_file',
		'fi_download',
		'fi_lock'
	]

	public async initIcons(): Promise<void> {
		// Пример
		for (const icon of this.icons) {
			await this.iconService.registerIconFromAssets(
				icon,
				`assets/icons/ui-kit-icons/${icon}.svg`
			)
		}
	}
}
