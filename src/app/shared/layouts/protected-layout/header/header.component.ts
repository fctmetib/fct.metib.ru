import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { currentUserFactoringSelector, currentUserGeneralSelector } from 'src/app/auth/store/selectors';
import { CurrentUserFactoringInterface } from '../../../types/currentUserFactoring.interface';
import { CurrentUserGeneralInterface } from 'src/app/shared/types/currentUserGeneral.interface';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  public currentUserFactoring$: Observable<CurrentUserFactoringInterface | null>;
  public currentUser$: Observable<CurrentUserGeneralInterface | null>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.currentUserFactoring$ = this.store.pipe(select(currentUserFactoringSelector));
    this.currentUser$ = this.store.pipe(select(currentUserGeneralSelector));
  }
}
