import { Component, inject, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import {Subscription} from 'rxjs'
import {BreakpointObserverService} from '../../services/common/breakpoint-observer.service'
import { isPlatformBrowser } from '@angular/common'
import { WINDOW } from '../../tokens/window.token';

@Component({
	selector: 'mib-new-footer',
	templateUrl: './new-footer.component.html',
	styleUrls: ['./new-footer.component.scss']
})
export class NewFooterComponent implements OnInit, OnDestroy {
	public isDesktop: boolean = false

	private subscriptions = new Subscription()

	public getNewYear: number = 2000

	constructor(
		public breakpointService: BreakpointObserverService,
		@Inject(PLATFORM_ID) private platformId: Object
	) {}

  private window = inject(WINDOW)

	ngOnInit(): void {
		this.subscriptions = this.breakpointService
			.isDesktop()
			.subscribe(b => (this.isDesktop = b))

		this.getNewYear = new Date().getFullYear()
	}

	getMap() {
		console.log('get map')
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}

	public downloadFile() {
		let link = document.createElement('a')

		link.download = 'Политика_в_отношении_обработки_персональных_данных'
		link.href = 'assets/_files/Политика_в_отношении_обработки_персональных_данных.pdf'

		link.click()
	}

	openExternalSite() {
		if (isPlatformBrowser(this.platformId)) {
			this.window?.open('https://fct.metallinvestbank.ru/login', '_blank')
		}
	}
}
