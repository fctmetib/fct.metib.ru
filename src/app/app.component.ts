import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {AutoUnsubscribeService} from './shared/services/auto-unsubscribe.service'
import {NavigationEnd, Router} from '@angular/router'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [AutoUnsubscribeService]
})
export class AppComponent implements OnInit {
	@ViewChild('scrollContainer') scrollContainer: ElementRef

	constructor(private router: Router) {}

	ngOnInit(): void {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.scrollToTop()
			}
		})
	}

	scrollToTop(): void {
		if (this.scrollContainer && this.scrollContainer.nativeElement) {
			this.scrollContainer.nativeElement.scrollTop = 0
		}
	}
}
