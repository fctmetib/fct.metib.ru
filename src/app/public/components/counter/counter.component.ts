import {Component, Input} from '@angular/core'

@Component({
	selector: 'mib-counter',
	templateUrl: './counter.component.html',
	styleUrls: ['./counter.component.scss']
})
export class CounterComponent {
	@Input() filled: boolean = true
}
