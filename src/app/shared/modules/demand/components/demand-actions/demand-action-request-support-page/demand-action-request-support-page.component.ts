import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-demand-action-request-support-page',
  templateUrl: './demand-action-request-support-page.component.html',
  styleUrls: ['./demand-action-request-support-page.component.scss'],
})
export class DemandActionRequestSupportPageComponent implements OnInit {
  isUserVerified: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();
  }

  ngOnDestroy() {}

  a() {

  }
}
