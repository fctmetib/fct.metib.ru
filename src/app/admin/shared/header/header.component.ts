import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { currentUserFactoringSelector, currentUserGeneralSelector } from 'src/app/auth/store/selectors';
import { CurrentUserGeneralInterface } from 'src/app/shared/types/currentUserGeneral.interface';
import { CurrentUserFactoringInterface } from 'src/app/shared/types/currentUserFactoring.interface';
import { CustomerInterface } from 'src/app/shared/types/customer/customer.interface';
import { PageStoreService } from '../services/page-store.service';
import { PageInterface } from '../types/page.interface';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  baseAvatarUrl = "https://api-factoring.metib.ru/api/avatar";
  baseAvatarProfileUrl = "http://api-factoring.metib.ru:8094/api/avatar/";

  public currentUserFactoring$: Observable<CurrentUserFactoringInterface | null>;
  public currentUser$: Observable<CurrentUserGeneralInterface | null>;
  public factoring$: Observable<CustomerInterface | null>;
  public page$: Observable<PageInterface>;

  constructor(private store: Store, private authService: AuthService, private router: Router, private pageStoreService: PageStoreService) {}

  ngOnInit() {
    this.currentUserFactoring$ = this.store.pipe(select(currentUserFactoringSelector));
    this.currentUser$ = this.store.pipe(select(currentUserGeneralSelector));
    this.page$ = this.pageStoreService.getPage();
  }

  logout() {
    this.authService.logout()
  }

  openAccountOwner() {
    document.getElementById("dropdownMenu").classList.toggle("show");
  }
}
