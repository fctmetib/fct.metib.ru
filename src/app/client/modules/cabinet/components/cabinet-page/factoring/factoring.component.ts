import { DeliveryInterface } from '../../../../../../shared/types/delivery/delivery.interface';
import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/shared/types/customer/customer';
import { StatisticsInterface } from '../../../types/common/statistics.interface';
import { ClientService } from 'src/app/shared/services/common/client.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { BehaviorSubject, filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-factoring',
  templateUrl: './factoring.component.html',
  styleUrls: ['./factoring.component.scss'],
})
export class FactoringComponent implements OnInit {
  @Input()
  stats: StatisticsInterface;

  public factoring$ = new BehaviorSubject<Customer>(null);

  public deliveries: DeliveryInterface[] = [];

  constructor(
    private authService: AuthService,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.authService.currentUser$.pipe(
      filter(Boolean),
      switchMap((currentUser) => this.clientService.getClientFactoringById(+currentUser?.userFactoring?.OrganizationID)),
      tap((result) => {
        this.factoring$.next(result);
      })
    ).subscribe();
  }
}
