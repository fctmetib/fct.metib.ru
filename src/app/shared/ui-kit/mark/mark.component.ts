import {Component, Input} from '@angular/core'

@Component({
	selector: 'mib-mark',
	templateUrl: './mark.component.html',
	styleUrls: ['./mark.component.scss']
})
export class MarkComponent {
	@Input() type: boolean = true
}
