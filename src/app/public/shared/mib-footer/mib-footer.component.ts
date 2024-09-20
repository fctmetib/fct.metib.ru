import {isPlatformBrowser} from '@angular/common'
import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core'

@Component({
	selector: 'mib-footer',
	styleUrls: ['./mib-footer.component.scss'],
	templateUrl: 'mib-footer.component.html'
})
export class MibFooterComponent implements OnInit {
	constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

	public openSocial(type: string) {
		// Проверяем, что код выполняется в браузере
		if (isPlatformBrowser(this.platformId)) {
			switch (type) {
				case 'whatsapp':
					window.open('https://wa.me/79259508870', '_blank')
					break
				case 'instagram':
					window.open('https://www.instagram.com/factoring.metib.ru/', '_blank')
					break
			}
		}
	}

	ngOnInit() {}
}
