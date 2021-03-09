import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-demand-action-limit-page',
  templateUrl: './demand-action-limit-page.component.html',
  styleUrls: ['./demand-action-limit-page.component.scss'],
})
export class DemandActionLimitPageComponent implements OnInit {
  isUserVerified: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();
  }
  ngOnDestroy() {}

  a() {

  }
}
