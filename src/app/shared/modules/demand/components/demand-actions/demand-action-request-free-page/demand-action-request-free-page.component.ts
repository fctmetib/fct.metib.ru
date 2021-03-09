import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-demand-action-request-free-page',
  templateUrl: './demand-action-request-free-page.component.html',
  styleUrls: ['./demand-action-request-free-page.component.scss'],
})
export class DemandActionRequestFreePageComponent implements OnInit {
  isUserVerified: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();
  }

  ngOnDestroy() {}

  a() {}
}
