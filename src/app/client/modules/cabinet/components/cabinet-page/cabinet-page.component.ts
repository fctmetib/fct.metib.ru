import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AuthService } from '../../../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CurrentUserFactoringInterface } from 'src/app/shared/types/currentUserFactoring.interface';
import {
  currentUserFactoringSelector,
  isLoadingSelector,
} from 'src/app/auth/store/selectors';

import * as introJs from 'intro.js/intro.js';
// import IntroJS
// import { IntroJs } from 'intro.js/intro';
@Component({
  selector: 'app-cabinet-page',
  templateUrl: './cabinet-page.component.html',
  styleUrls: ['./cabinet-page.component.scss'],
})
export class CabinetPageComponent implements OnInit {
  introJS = introJs();

  public currentUserFactoring$: Observable<CurrentUserFactoringInterface | null>;
  public loading$: Observable<boolean | null>;

  constructor(private authSerice: AuthService, private store: Store) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(isLoadingSelector));
    this.currentUserFactoring$ = this.store.pipe(
      select(currentUserFactoringSelector)
    );
  }

  public logout(): void {
    this.authSerice.logout();
  }

  // Intro method to be called
  introMethod() {
    this.introJS.setOptions({
      steps: [
        {
          intro: 'Добро пожаловать в обучение!',
        },
        {
          element: '#step1',
          intro:
            "В данной секции отображаются все отчеты. Чтобы перейти к нужному отчету - кликните по нему, один раз.",
          position: 'right',
        },
        // {
        //   element: '#step2',
        //   intro:
        //     'Most people live way too long in the past. The past is a springboard to jump forward from, not a sofa to relax on',
        //   position: 'bottom',
        // },
      ],
      showProgress: true,
      skipLabel: 'Пропустить',
      doneLabel: 'Завершить',
      nextLabel: 'Круто, дальше!',
      prevLabel: 'Назад',
      overlayOpacity: '0.8',
    });
    this.introJS.start();
  }
}
