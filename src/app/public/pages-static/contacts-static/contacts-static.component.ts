import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-contacts-static',
  templateUrl: './contacts-static.component.html',
  styleUrls: ['./contacts-static.component.scss']
})
export class ContactsStaticComponent  implements OnInit {

  ngOnInit(): void {
    window.location.href = 'contacts.html';
  }

}
