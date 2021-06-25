import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ExitGuard } from 'src/app/shared/services/exit.guard';

@Component({
  selector: 'app-demand-action-request-support-page',
  templateUrl: './demand-action-request-support-page.component.html',
  styleUrls: ['./demand-action-request-support-page.component.scss'],
})
export class DemandActionRequestSupportPageComponent implements OnInit, ExitGuard {
  isUserVerified: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();
  }

  ngOnDestroy() {}

  a() {

  }

  canDeactivate(): boolean | Observable<boolean> {
    return confirm('Внимание! Возможно, Вы не сохранили данные, хотите покинуть страницу?');
  }
}
