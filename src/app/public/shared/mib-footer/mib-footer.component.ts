import {isPlatformBrowser} from '@angular/common'
import { Component, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { WINDOW } from '../../../shared/tokens/window.token';

@Component({
	selector: 'mib-footer',
	styleUrls: ['./mib-footer.component.scss'],
	templateUrl: 'mib-footer.component.html'
})
export class MibFooterComponent implements OnInit {
	constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private window = inject(WINDOW)

	public openSocial(type: string) {
		// Проверяем, что код выполняется в браузере
		if (isPlatformBrowser(this.platformId)) {
			switch (type) {
				case 'whatsapp':
					this.window?.open('https://wa.me/79259508870', '_blank')
					break
				case 'instagram':
          this.window?.open('https://www.instagram.com/factoring.metib.ru/', '_blank')
					break
			}
		}
	}

	ngOnInit() {}
}
