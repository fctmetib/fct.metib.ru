import {DeliveryInterface} from '../../../../../../shared/types/delivery/delivery.interface'
import {Component, Input, OnInit} from '@angular/core'
import {Customer} from 'src/app/shared/types/customer/customer'
import {StatisticsInterface} from '../../../types/common/statistics.interface'
import {ClientService} from 'src/app/shared/services/common/client.service'
import {AuthService} from 'src/app/auth/services/auth.service'
import {BehaviorSubject, filter, finalize, switchMap, tap} from 'rxjs'
import {Properties} from 'csstype'

@Component({
	selector: 'app-factoring',
	templateUrl: './factoring.component.html',
	styleUrls: ['./factoring.component.scss']
})
export class FactoringComponent implements OnInit {
	@Input()
	stats: StatisticsInterface

	public loading$ = new BehaviorSubject<boolean>(false)

	public defaultSkeleton: Properties = {
		borderRadius: '8px',
		width: '100%'
	}

	public factoring$ = new BehaviorSubject<Customer>(null)

	public deliveries: DeliveryInterface[] = []

	constructor(
		private authService: AuthService,
		private clientService: ClientService
	) {}

	ngOnInit() {
		this.loading$.next(true)
		this.authService.currentUser$
			.pipe(
				filter(Boolean),
				switchMap(currentUser =>
					this.clientService.getClientFactoringById(
						+currentUser?.userFactoring?.OrganizationID
					)
				),
				tap(result => {
					this.factoring$.next(result)
					this.loading$.next(false)
				})
			)
			.subscribe()
	}
}
