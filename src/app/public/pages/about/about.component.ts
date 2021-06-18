import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'about',
  template: `
  <div class="about">
    <h2>О нас</h2>
  </div>`
})

export class AboutComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
