import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-clients-static',
  templateUrl: './clients-static.component.html',
  styleUrls: ['./clients-static.component.scss']
})
export class ClientsStaticComponent implements OnInit {

  ngOnInit(): void {
    window.location.href = 'clients.html';
  }

}
