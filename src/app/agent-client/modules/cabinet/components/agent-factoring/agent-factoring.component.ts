import {Component} from '@angular/core'
import {Properties} from 'csstype'
import {BehaviorSubject} from 'rxjs'

@Component({
	selector: 'mib-agent-factoring',
	templateUrl: './agent-factoring.component.html',
	styleUrls: ['./agent-factoring.component.scss']
})
export class AgentFactoringComponent {
	public loading$ = new BehaviorSubject<boolean>(false)

	public defaultSkeleton: Properties = {
		borderRadius: '8px',
		width: '100%'
	}
}
