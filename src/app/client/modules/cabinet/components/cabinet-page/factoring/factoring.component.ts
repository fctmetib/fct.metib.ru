import { OrganizationInterface } from './../../../../../../shared/types/organization/organization.interface';
import { OrganizationService } from './../../../../../../shared/services/share/organization.service';
import { DeliveryInterface } from './../../../../../../shared/types/delivery/delivery.interface';
import { DeliveryService } from './../../../../../../shared/services/share/delivery.service';
import { forkJoin, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, Input, OnInit } from '@angular/core';
import { CurrentUserFactoringInterface } from 'src/app/shared/types/currentUserFactoring.interface';
import { factoringSelector } from 'src/app/client/store/selectors';
import { CustomerInterface } from 'src/app/shared/types/customer/customer.interface';
@Component({
  selector: 'app-factoring',
  templateUrl: './factoring.component.html',
  styleUrls: ['./factoring.component.scss'],
})
export class FactoringComponent implements OnInit {
  public factoring: CustomerInterface;

  public organization: OrganizationInterface;
  public deliveries: DeliveryInterface[] = [];

  constructor(
    private store: Store
  ) {}

  ngOnInit() {
    this.store.pipe(select(factoringSelector)).subscribe(resp => {
      this.factoring = resp;


      // TODO: Rework it on NgRx style
      // if(resp) {
      // .subscribe(resp => {
      //     this.deliveries = resp;
      //   });

      //  .subscribe(resp => {
      //     this.organization = resp;
      //   });
      // }

    });


  }
}
