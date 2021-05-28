import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-demand-action-verification-page',
  templateUrl: './demand-action-verification-page.component.html',
  styleUrls: ['./demand-action-verification-page.component.scss'],
})
export class DemandActionVerificationPageComponent implements OnInit {
  isUserVerified: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();
  }

  ngOnDestroy() {}

  a() {}
}
