import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mib-menu',
  templateUrl: './mib-menu.component.html',
  styleUrls: ['./mib-menu.component.scss'],
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
