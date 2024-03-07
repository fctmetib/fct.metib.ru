import {Component, OnInit} from '@angular/core'

@Component({
	selector: 'clients',
	styleUrls: ['./clients.component.scss'],
	templateUrl: 'clients.component.html'
})
export class ClientsComponent {
	constructor() {}

	public addAgreement() {
		console.log('agrement')
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
