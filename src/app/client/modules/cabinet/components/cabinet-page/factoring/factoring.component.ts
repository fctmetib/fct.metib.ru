import { Observable } from 'rxjs';
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
  @Input('factoringUser') factoringUser: CurrentUserFactoringInterface

  currentUser: CurrentUserFactoringInterface;
  public factoring$: Observable<CustomerInterface | null>;

  constructor(
    private store: Store
  ) {}

  ngOnInit() {
    this.currentUser = this.factoringUser;
    this.factoring$ = this.store.pipe(select(factoringSelector));
  }
}
