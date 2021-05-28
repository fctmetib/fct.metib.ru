import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-demand-action-surety-page',
  templateUrl: './demand-action-surety-page.component.html',
  styleUrls: ['./demand-action-surety-page.component.scss'],
})
export class DemandActionSuretyPageComponent implements OnInit {
  isUserVerified: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();
  }

  ngOnDestroy() {}

  a() {

  }
}
