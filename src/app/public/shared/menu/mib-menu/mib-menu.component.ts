import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mib-menu',
  styleUrls: ['./mib-menu.component.scss'],
  templateUrl: './mib-menu.component.html',
})
export class MibMenuComponent implements OnInit {

  //TODO: add Input linksItems

  constructor() {}

  ngOnInit() {}

  close() {
    let toggler: any = document.getElementsByClassName('toggler')[0];
    toggler.checked = false;
  }
}
