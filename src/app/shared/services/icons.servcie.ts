import {Injectable} from '@angular/core'
import {DomSanitizer} from '@angular/platform-browser'
import {RefIconService} from '../ui-kit/ref-icon/services/ref-icon.service'

export type IconsNames = typeof IconsService.prototype.icons[number] | '';

@Injectable({
	providedIn: 'root'
})
export class IconsService {
	constructor(
		private domSanitizer: DomSanitizer,
		private iconService: RefIconService
	) {}

	public icons = [
		'fi_chevron-left',
		'fi_chevron-right',
		'fi_search',
		'fi_x',
		'fi_menu',
		'fi_link',
		'fi_chevron-down',
		'logotype',
		'logotype-l',
		'footerLogo',
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
		'fi_send',
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
		'fi_lock',
		'logo_round',
		'fi_calendar',
		'fi_corner-down-left',
		'fi_arrow-right',
		'fi_trash',
		'fi_user',
		'fi_share-2',
		'fi_paperclip',
		'fi_log-in',
		'fi_twitter',
		'fi_shield',
		'fi_clipboard',
		'fi_grid',
		'fi_list',
		'fi_more-horizontal',
		'fi_image',
		'fi_repeat',
		'fi_logo_round_main',
    'fi_chevrons-down',
    'fi_chevrons-up',
    'fi_filter',
	] as const

	public async initIcons(): Promise<void> {
		const promises = this.icons.map(icon =>
			this.iconService.registerIconFromAssets(
				icon,
				`assets/icons/ui-kit-icons/${icon}.svg`
			)
		)

		await Promise.all(promises)
	}
}
