import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../shared/services/common/localstorage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

  public preloader: boolean = false;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.preloader = true;
    //TODO: rework it
    // обновляет страницу, для изоляции стилей
    if (this.localStorageService.getValue('fromPublic')) {
      this.localStorageService.clearValue('fromPublic');
      let currentUrl = this.router.url;
      this.router.navigate([currentUrl]).then(() => {
        window.location.reload();
      });
    } else {
      this.preloader = false;
    }
  }

  ngOnDestroy() {}
}
