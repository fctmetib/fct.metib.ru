import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ui-kit-test',
  styleUrls: ['./ui-kit-test.component.scss'],
  templateUrl: 'ui-kit-test.component.html'
})

export class UIKitTestComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

  // Buttons
  public buttonMessageOne = 0;
  public incrementButton(type: number) {
    switch(type) {
      case 1:
        this.buttonMessageOne++;
        break;
    }
  }
}
