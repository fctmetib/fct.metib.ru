import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { currentUserFactoringSelector } from 'src/app/auth/store/selectors';
import { CurrentUserFactoringInterface } from '../../../types/currentUserFactoring.interface';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  public currentUserFactoring$: Observable<CurrentUserFactoringInterface | null>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.currentUserFactoring$ = this.store.pipe(select(currentUserFactoringSelector));
  }
}
