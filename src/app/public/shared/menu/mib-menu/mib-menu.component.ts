import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'mib-menu',
  templateUrl: './mib-menu.component.html',
  styleUrls: ['./mib-menu.component.scss'],
})
export class MibMenuComponent implements OnInit {

  //TODO: add Input linksItems

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
    ) {}

  ngOnInit() {}

  close() {
    if (isPlatformBrowser(this.platformId)) {
      let toggler: any = document.getElementsByClassName('toggler')[0];
      toggler.checked = false;
    }
  }
}
