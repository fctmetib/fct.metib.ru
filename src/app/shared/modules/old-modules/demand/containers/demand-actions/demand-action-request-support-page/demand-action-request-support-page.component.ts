import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ExitGuard } from 'src/app/shared/services/exit.guard';

@Component({
  selector: 'app-demand-action-request-support-page',
  templateUrl: './demand-action-request-support-page.component.html',
  styleUrls: ['./demand-action-request-support-page.component.scss'],
})
export class DemandActionRequestSupportPageComponent
  implements OnInit, ExitGuard
{
  isUserVerified: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();
  }
  public back() {
    const notVerify = 'not-verify';
    const baseUrl = this.isUserVerified ? '' : notVerify;
    this.router.navigate([`${baseUrl}/demand`]);
  }

  ngOnDestroy() {}

  a() {}

  canDeactivate(): boolean | Observable<boolean> {
    return confirm(
      'Внимание! Возможно, Вы не сохранили данные, хотите покинуть страницу?'
    );
  }
}
