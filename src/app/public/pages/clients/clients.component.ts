import {Component, OnInit} from '@angular/core'
import {Subscription} from 'rxjs'
import {BreakpointObserverService} from 'src/app/shared/services/common/breakpoint-observer.service'

@Component({
	selector: 'clients',
	styleUrls: ['./clients.component.scss'],
	templateUrl: 'clients.component.html'
})
export class ClientsComponent {
	public isDesktop: boolean = false

	private subscriptions = new Subscription()

	constructor(public breakpointService: BreakpointObserverService) {}

	ngOnInit(): void {
		this.subscriptions = this.breakpointService
			.isDesktop()
			.subscribe(b => (this.isDesktop = b))
	}

	public addAgreement() {
		console.log('agrement')
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}

	// public openAstralList(): void {
	//   window.open('https://astral.ru/', '_blank');
	// }

	// public getContract(): void {
	//   window.open(`${window.location.origin}/assets/_files/contract.zip`);
	// }

	// public getInstruction(): void {
	//   window.open(`${window.location.origin}/assets/_files/FactorClientHelp.zip`);
	// }

	// public getReglament(): void {
	//   window.open(`${window.location.origin}/assets/_files/reglament.pdf`);
	// }
}
