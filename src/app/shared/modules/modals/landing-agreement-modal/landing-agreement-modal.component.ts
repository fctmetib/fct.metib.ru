import {Component, OnDestroy, OnInit} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'
import {Subscription} from 'rxjs'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'

@Component({
	selector: 'mib-landing-agreement-modal',
	templateUrl: './landing-agreement-modal.component.html',
	styleUrls: ['./landing-agreement-modal.component.scss']
})
export class LandingAgreementModalComponent implements OnInit, OnDestroy {
	public isDesktop: boolean = false

	private subscriptions = new Subscription()

	constructor(
		public dialogRef: MatDialogRef<LandingAgreementModalComponent>,
		public breakpointService: BreakpointObserverService
	) {}

	ngOnInit(): void {
		this.subscriptions = this.breakpointService
			.isDesktop()
			.subscribe(b => (this.isDesktop = b))
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}
