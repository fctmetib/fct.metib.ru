import { Component, Input, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/admin/shared/types/user.interface';

@Component({
  selector: 'card-user',
  template: `
    <div class="card-user">
      <div class="card-user__information">
        <div class="card-user__information__name">
          <h4>{{user?.Name}}</h4>
        </div>
        <div class="card-user__information__organization">
          <p>{{user?.Organization}}</p>
        </div>
      </div>
      <div class="card-user__contacts">
        <div class="card-user__contacts__contact">
          <img src="../../../../../../assets/admin/icons/icon-email.png" alt="Email">
          {{user?.Email}}
        </div>
      </div>
      <div class="card-user__actions">
        <button type="button" pButton class="basic" label="Войти от имени пользователя" (click)="switchAccount()" ></button>
      </div>
  </div>
  `,
  styleUrls: ['./card-user.component.scss']
})

export class CardUserComponent implements OnInit {
  @Input()
  user: UserInterface;

  constructor() { }

  ngOnInit() { }

  public switchAccount() {
    // TODO: Switch user {{user?.Login}}
  }
}
