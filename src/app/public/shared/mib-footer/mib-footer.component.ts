import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mib-footer',
  styleUrls: ['./mib-footer.component.scss'],
  templateUrl: 'mib-footer.component.html'
})

export class MibFooterComponent implements OnInit {
  constructor() { }

  public openSocial(type: string) {
    switch (type) {
      //
      case 'whatsapp':
        window.open('https://wa.me/79259508870', '_blank');
        break;
      case 'instagram':
        window.open('https://www.instagram.com/factoring.metib.ru/', '_blank');
        break;
    }
  }

  ngOnInit() { }
}
