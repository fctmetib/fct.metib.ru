import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @ViewChild('header') el: ElementRef<HTMLDivElement>

  constructor(
    private authService: AuthService
  ) {
  }

  get height() {
    return this.el?.nativeElement?.offsetHeight ?? 0
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }


}
