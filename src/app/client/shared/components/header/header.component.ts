import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../../auth/services/auth.service';
import {ToolsService} from '../../../../shared/services/tools.service';
import {BehaviorSubject, filter, finalize, switchMap, tap} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {CurrentUserFactoring} from '../../../../shared/types/currentUserFactoring';
import {CurrentUserGeneral} from '../../../../shared/types/currentUserGeneral';
import {Customer} from '../../../../shared/types/customer/customer';
import {MenuItem} from 'primeng/api';
import {ClientService} from '../../../../shared/services/common/client.service';
import {Properties} from 'csstype';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @ViewChild('header') el: ElementRef<HTMLDivElement>

  items: MenuItem[];
  baseAvatarUrl = 'https://api-factoring.metib.ru/api/avatar';
  baseAvatarProfileUrl = `${environment.apiUrl}/avatar/`

  public userLoading$ = new BehaviorSubject<boolean>(false);
  public factoringLoading$ = new BehaviorSubject<boolean>(false);

  public currentUserFactoring$ = new BehaviorSubject<CurrentUserFactoring>(null);
  public currentUser$ = new BehaviorSubject<CurrentUserGeneral>(null);
  public factoring$ = new BehaviorSubject<Customer>(null);

  public isAdmin: boolean = false;
  public skeleton: Properties = {
    borderRadius: '8px',
    height: '40px',
    width: '265px'
  };

  constructor(
    private authService: AuthService,
    private toolsService: ToolsService,
    private clientService: ClientService,
  ) {
  }

  get profile() {
    return this.currentUser$?.value?.Profile
  }

  get manager() {
    return this.factoring$.value?.Manager
  }

  get managerInitials() {
    return this.getInitials(this.manager?.Name ?? 'О')
  }

  get name() {
    return this.toolsService.concatArray([this.profile?.Name?.Last, this.profile?.Name?.First])
  }

  get nameInitials() {
    return this.getInitials(this.name)
  }

  get height() {
    return this.el?.nativeElement?.offsetHeight ?? 0
  }

  private getInitials(name: string) {
    return name.split(' ').map(x => x.slice(0, 1)).join('')
  }


  ngOnInit() {
    this.userLoading$.next(true)
    this.factoringLoading$.next(true)
    this.authService.currentUser$.pipe(
      filter(Boolean),
      tap((currentUser) => {
        this.currentUser$.next(currentUser.userGeneral);
        currentUser.userGeneral
        this.currentUserFactoring$.next(currentUser.userFactoring);
        console.log(currentUser)
        this.userLoading$.next(false);
      }),
      switchMap((currentUser) => this.clientService.getClientFactoringById(+currentUser.userFactoring.OrganizationID).pipe(
        finalize(() => this.factoringLoading$.next(false))
      )),
      tap((clientFactoring) => {
        this.factoring$.next(clientFactoring)
      }),
    ).subscribe();

    this.isAdmin = this.authService.isUserAdmin();
  }

  logout() {
    this.authService.logout();
  }
}
