import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-demand-action-edit-profile-page',
  templateUrl: './demand-action-edit-profile-page.component.html',
  styleUrls: ['./demand-action-edit-profile-page.component.scss'],
})
export class DemandActionEditProfilePageComponent implements OnInit {
  isUserVerified: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();
  }
  ngOnDestroy() {}

  a() {

  }
}
