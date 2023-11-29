import { Component, Input } from '@angular/core'
import { MibBadgeSize, MibBadgeType } from './interfaces/badge.interface'

@Component({
	selector: 'mib-badge',
	templateUrl: './badge.component.html',
	styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {
	@Input() size: MibBadgeSize = 'l'
	@Input() type: MibBadgeType = 'filled-primary'
	@Input() extended: boolean = false
}
