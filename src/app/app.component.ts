import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {NavigationEnd, Router} from '@angular/router'
import {AuthService} from './auth/services/auth.service'
import {DestroyService} from './shared/services/common/destroy.service'
import {takeUntil} from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DestroyService]
})
export class AppComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer: ElementRef

  constructor(private router: Router, private authSrv: AuthService, private destroy$: DestroyService) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.scrollToTop()
      }
    })

    setInterval(() => {
      console.log(this.authSrv.isUserLoggedIn)
      if (this.authSrv.isUserLoggedIn) this.authSrv.reauth().pipe(takeUntil(this.destroy$)).subscribe()
    }, 1800000)
  }

  scrollToTop(): void {
    if (this.scrollContainer && this.scrollContainer.nativeElement) {
      this.scrollContainer.nativeElement.scrollTop = 0
    }
  }
}
