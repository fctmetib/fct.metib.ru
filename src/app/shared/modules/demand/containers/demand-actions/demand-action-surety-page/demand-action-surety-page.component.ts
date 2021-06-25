import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ExitGuard } from 'src/app/shared/services/exit.guard';

@Component({
  selector: 'app-demand-action-surety-page',
  templateUrl: './demand-action-surety-page.component.html',
  styleUrls: ['./demand-action-surety-page.component.scss'],
})
export class DemandActionSuretyPageComponent implements OnInit, ExitGuard {
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
