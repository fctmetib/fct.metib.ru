import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  template: `
  <div class="home">
    <h2>Главная</h2>
  </div>`
})

export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
