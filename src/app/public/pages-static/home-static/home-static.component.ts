import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home.html-static',
  templateUrl: './home-static.component.html',
  styleUrls: ['./home-static.component.scss']
})
export class HomeStaticComponent implements OnInit {

  ngOnInit(): void {
    window.location.href = 'home.html';
  }

}
