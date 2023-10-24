import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tariffs.html-static',
  templateUrl: './tariffs-static.component.html',
  styleUrls: ['./tariffs-static.component.scss']
})
export class TariffsStaticComponent implements OnInit {

  ngOnInit(): void {
    window.location.href = 'tariffs.html';
  }

}
