import {Component, Input, OnDestroy, OnInit} from '@angular/core'
import {ContactPanelDevice} from './interfaces/contact-panel.interface'
import {Subscription} from 'rxjs'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'

@Component({
	selector: 'mib-contact-panel',
	templateUrl: './contact-panel.component.html',
	styleUrls: ['./contact-panel.component.scss']
})
export class ContactPanelComponent implements OnInit, OnDestroy {
	@Input() device: ContactPanelDevice = 'desktop'
	@Input() contactImage: string = ''
	@Input() contactName: string = ''
	@Input() contactPosition: string = ''
	@Input() contactMail: string = ''

	get isImgSrcEmpty(): boolean {
		return !this.contactImage || this.contactImage.trim() === ''
	}

	public isDesktop: boolean = false

	private subscriptions = new Subscription()

	constructor(public breakpointService: BreakpointObserverService) {}

	get classes() {
		return {
			[`contact_${this.device}`]: true
		}
	}

	ngOnInit(): void {
		this.subscriptions = this.breakpointService
			.isDesktop()
			.subscribe(b => (this.isDesktop = b))
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
