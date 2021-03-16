import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';
import { CustomerInterface } from '../../../types/customer/customer.interface';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { currentUserFactoringSelector, currentUserGeneralSelector } from 'src/app/auth/store/selectors';
import { CurrentUserFactoringInterface } from '../../../types/currentUserFactoring.interface';
import { CurrentUserGeneralInterface } from 'src/app/shared/types/currentUserGeneral.interface';
import { factoringSelector } from 'src/app/client/store/selectors';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss'],
})
export class MobileHeaderComponent implements OnInit {

  items: MenuItem[];
  baseAvatarUrl = "https://api-factoring.metib.ru/api/avatar";

  public currentUserFactoring$: Observable<CurrentUserFactoringInterface | null>;
  public currentUser$: Observable<CurrentUserGeneralInterface | null>;
  public factoring$: Observable<CustomerInterface | null>;

  constructor(private store: Store, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.currentUserFactoring$ = this.store.pipe(select(currentUserFactoringSelector));
    this.currentUser$ = this.store.pipe(select(currentUserGeneralSelector));
    this.factoring$ = this.store.pipe(select(factoringSelector));
  }

  logout() {
    this.authService.logout()
  }
}
