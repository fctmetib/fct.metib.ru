import { Component } from '@angular/core'
import { InputSize } from '../../ui-kit/input/interfaces/input.interface'
import { FormControl, Validators } from '@angular/forms'

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
	public inputSizeL: InputSize = 'l'
	public inputSizeM: InputSize = 'm'
	public inputSizeS: InputSize = 's'
	public inputSizeXS: InputSize = 'xs'

	control = new FormControl(null, [Validators.required])

	login() {
		console.log('halo click!')
	}
	scrollTop() {
		console.log('halo scroll!')
	}
}
