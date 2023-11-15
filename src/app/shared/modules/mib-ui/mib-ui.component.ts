import { Component } from '@angular/core'

@Component({
	selector: 'app-mib-ui',
	templateUrl: './mib-ui.component.html',
	styles: [
		`
			:host {
				max-width: 1200px;
				display: block;
				margin: auto;
				padding: 0 15px;
			}
			.btn-wrapper {
				display: flex;
				gap: 2rem;
				flex-wrap: wrap;
			}
		`
	]
})
export class MibUiComponent {
	isShown = false

	login() {
		console.log('halo click!')
	}
	scrollTop() {
		console.log('halo scroll!')
	}
}
