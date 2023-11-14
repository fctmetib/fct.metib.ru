import { Component } from '@angular/core'

@Component({
	selector: 'app-mib-ui',
	templateUrl: './mib-ui.component.html',
	styles: [
		`
			.btn-wrapper {
				display: flex;
				gap: 2rem;
				flex-wrap: wrap;
			}
		`
	]
})
export class MibUiComponent {
	login() {
		console.log('halo click!')
	}
	scrollTop() {
		console.log('halo scroll!')
	}
}
