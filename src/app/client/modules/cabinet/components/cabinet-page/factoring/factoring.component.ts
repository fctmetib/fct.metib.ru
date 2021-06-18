import { DeliveryInterface } from './../../../../../../shared/types/delivery/delivery.interface';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { factoringSelector } from 'src/app/client/store/selectors';
import { CustomerInterface } from 'src/app/shared/types/customer/customer.interface';
@Component({
  selector: 'app-factoring',
  templateUrl: './factoring.component.html',
  styleUrls: ['./factoring.component.scss'],
})
export class FactoringComponent implements OnInit {
  public factoring: CustomerInterface;

  public deliveries: DeliveryInterface[] = [];

  constructor(
    private store: Store
  ) {}

  ngOnInit() {

    this.store.pipe(select(factoringSelector)).subscribe(resp => {
      this.factoring = resp;
    });


  }
}
