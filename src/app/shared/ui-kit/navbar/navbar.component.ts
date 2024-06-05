import {
	AfterContentInit,
	Component,
	ContentChildren,
	Input,
	OnInit,
	QueryList
} from '@angular/core'
import {tap} from 'rxjs'
import {
	NavbarPointSize,
	NavbarPointType
} from './interfaces/navbar-point.interface'
import {NavbarPointComponent} from './components/navbar-point/navbar-point.component'
import {startWith} from 'rxjs/operators'

@Component({
	selector: 'mib-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterContentInit {
	@Input() set type(type: NavbarPointType) {
		this._type = type
		this.setNavbarPointsParams()
	}
	@Input() size: NavbarPointSize = 'm'

	public _type: NavbarPointType = 'separator'

	@ContentChildren(NavbarPointComponent, {descendants: true})
	navbarPoints!: QueryList<NavbarPointComponent>

	constructor() {}

	get classes() {
		return {
			[`navbar_${this._type}`]: true
		}
	}

	ngOnInit() {}

	ngAfterContentInit() {
		this.navbarPoints.changes
			.pipe(startWith(null), tap(this.setNavbarPointsParams))
			.subscribe()
	}

	public setNavbarPointsParams = () => {
		this.navbarPoints.forEach(point => {
			point.size = this.size
			point.type = this._type
		})
	}
}
