import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core'
import {AuthService} from 'src/app/auth/services/auth.service'
import {ToolsService} from '../../services/tools.service'
import {BehaviorSubject, filter, finalize, switchMap, tap} from 'rxjs'
import {environment} from 'src/environments/environment'
import {UserFactoring} from '../../types/userFactoring'
import {UserGeneral} from '../../types/userGeneral'
import {Customer} from '../../types/customer/customer'
import {MenuItem} from 'primeng/api'
import {ClientService} from '../../services/common/client.service'
import {Properties} from 'csstype'
import {DropdownService} from '../../ui-kit/dropdown/services/dropdown.service'

@Component({
  selector: 'mib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() signedIn: boolean = false
  @Input() showExtension: boolean = false

  @ViewChild('header') el: ElementRef<HTMLDivElement>

  items: MenuItem[]
  baseAvatarUrl = 'https://api-factoring.metib.ru/api/avatar/'
  baseAvatarProfileUrl = `${environment.apiUrl}/avatar/`

  public userLoading$ = new BehaviorSubject<boolean>(false)
  public factoringLoading$ = new BehaviorSubject<boolean>(false)

  public currentUserFactoring$ = new BehaviorSubject<UserFactoring>(null)
  public currentUser$ = new BehaviorSubject<UserGeneral>(null)
  public factoring$ = new BehaviorSubject<Customer>(null)

  public isAdmin: boolean = false
  public skeleton: Properties = {
    borderRadius: '8px',
    height: '40px',
    width: '265px'
  }

  constructor(
    public authService: AuthService,
    private toolsService: ToolsService,
    private clientService: ClientService,
    public dropdownService: DropdownService
  ) {
  }

  get classes() {
    return {
      'header_show-extension': this.showExtension,
      [`header_${this.signedIn ? 'signed' : 'unsigned'}`]: true
    }
  }

  get profile() {
    return this.currentUser$?.value?.Profile
  }

  get currentUserAvatar() {
    return this.currentUser$?.value?.Avatar
  }

  get manager() {
    return this.factoring$.value?.Manager
  }

  get managerAvatar() {
    return this.baseAvatarUrl + this.factoring$.value?.Manager?.Avatar
  }

  get managerInitials() {
    return this.getInitials(this.manager?.Name ?? 'О')
  }

  get name() {
    return this.toolsService.concatArray([
      this.profile?.Name?.Last,
      this.profile?.Name?.First
    ])
  }

  get nameInitials() {
    return this.getInitials(this.name)
  }

  get height() {
    return this.el?.nativeElement?.offsetHeight ?? 0
  }

  private getInitials(name: string) {
    return name
      .split(' ')
      .map(x => x.slice(0, 1))
      .join('')
  }

  ngOnInit() {
    this.userLoading$.next(true)
    this.factoringLoading$.next(true)
    this.authService.currentUser$
      .pipe(
        filter(Boolean),
        tap(currentUser => {
          this.currentUser$.next(currentUser.userGeneral)
          currentUser.userGeneral
          this.currentUserFactoring$.next(currentUser.userFactoring)
          console.log(currentUser)
          this.userLoading$.next(false)
        }),
        switchMap(currentUser =>
          this.clientService
            .getClientFactoringById(+currentUser.userFactoring.OrganizationID)
            .pipe(finalize(() => this.factoringLoading$.next(false)))
        ),
        tap(clientFactoring => {
          this.factoring$.next(clientFactoring)
        })
      )
      .subscribe()

    this.isAdmin = this.authService.isUserAdmin()
  }

  logout() {
    this.authService.logout()
  }
}
