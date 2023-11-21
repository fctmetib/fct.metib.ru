import { Component } from '@angular/core'
import { InputSize } from '../../ui-kit/input/interfaces/input.interface'

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
			.control {
				display: flex;
				min-height: 100%;
				outline: none;
				position: relative;
				background-color: #0b1f351a;
				padding: 16px;
				max-width: 360px;
				border-radius: 8px;
			}

			.icon-wrapper {
				align-items: center;
				display: flex;
				flex-shrink: 0;
				padding-right: 0;
			}
			.input-wrapper {
				flex-grow: 1;
				position: relative;
			}
			.input-wrapper:has(input:focus) .label-wrap > span {
				transform: translateY(-70%);
				transition: 0.2s;
			}
			.label-wrap {
				align-items: center;
				display: flex;
				font-size: 16px;
				font-weight: 400;
				left: 16px;
				line-height: 20px;
				position: absolute;
				right: 0;
				transform: translateY(5%);
			}
			.label {
				transition: 0.2s;
			}
			.input-wrap {
				align-items: center;
				display: flex;
				height: 100%;
				position: relative;
			}
			.input-wrap input {
				appearance: none;
				background: none;
				border: 1px solid red;
				box-sizing: border-box;
				display: block;
				font-size: 16px;
				font-weight: 400;
				height: 100%;
				line-height: 20px;
				margin: 0;
				outline: none;
				position: relative;
				width: 100%;
			}
		`
	]
})
export class MibUiComponent {
	isShown = false
	public inputSize: InputSize = 'l'

	login() {
		console.log('halo click!')
	}
	scrollTop() {
		console.log('halo scroll!')
	}
}
