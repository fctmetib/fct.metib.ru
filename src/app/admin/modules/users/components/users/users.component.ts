import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PageStoreService } from 'src/app/admin/shared/services/page-store.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserInterface } from 'src/app/admin/shared/types/user.interface';
import { UsersService } from '../../services/users.service';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ReauthRequestInterface } from 'src/app/auth/types/login/reauthRequest.interface';
import { Store } from '@ngrx/store';
import { reauthAction } from 'src/app/auth/store/actions/reauth.action';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  public userList$: Observable<UserInterface[]>;
  public filterForm: FormGroup;
  public isLoading: boolean = false;

  private subscription$: Subscription = new Subscription();

  constructor(
    private pageStoreService: PageStoreService,
    private store: Store,
    private formBuilder: FormBuilder,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.pageStoreService.setPage({
      header: 'Пользователи',
      description: 'Найдите и войдите от имени интересующего Вас пользователя',
    });

    this.filterForm = this.formBuilder.group({
      search: '',
    });

    this.onChanges();
  }

  public reauthHandler(userId: string): void {
    const request: ReauthRequestInterface = {
      userId: userId
    };

    this.store.dispatch(reauthAction({ request }));
  }

  onChanges(): void {
    this.subscription$.add(
      this.filterForm.valueChanges
        .pipe(
          tap(() => (this.isLoading = true)),
          debounceTime(2000),
          distinctUntilChanged()
        )
        .subscribe((value) => {
          this.userList$ = this.userService.getUsersList(value.search);
          this.isLoading = false;
        })
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
