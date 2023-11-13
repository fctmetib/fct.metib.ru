import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';
import { BehaviorSubject, Observable, filter, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CurrentUserFactoringInterface } from 'src/app/shared/types/currentUserFactoring.interface';
@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss'],
})
export class MobileHeaderComponent implements OnInit {
  items: MenuItem[];
  baseAvatarUrl = "https://api-factoring.metib.ru/api/avatar";

  public adminUserFactoring$ = new BehaviorSubject<CurrentUserFactoringInterface>(null);

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.currentUserAdmin$.pipe(
      filter(Boolean),
      tap((currentUser) => {
        this.adminUserFactoring$.next(currentUser.userFactoring);
      })
    ).subscribe();
  }

  logout() {
    this.authService.logout()
  }

  close() {
    let toggler: any = document.getElementsByClassName('toggler')[0];
    toggler.checked = false;
  }
}
