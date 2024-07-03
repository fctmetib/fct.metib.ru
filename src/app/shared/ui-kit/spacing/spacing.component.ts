import {Component, Input} from '@angular/core'

@Component({
	selector: 'mib-spacing',
	templateUrl: './spacing.component.html',
	styleUrls: ['./spacing.component.scss']
})
export class SpacingComponent {
	@Input() type:
		| 'xs2'
		| 'xm'
		| 'x'
		| 'xs'
		| 's'
		| 'm'
		| 'l'
		| 'lm'
		| 'xl'
		| 'xl2'
	@Input() customSpace: number = 0
}
