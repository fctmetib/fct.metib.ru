import { Component } from '@angular/core';

@Component({
  selector: 'app-delays-page',
  templateUrl: './delays-page.component.html',
  styleUrls: ['./delays-page.component.scss']
})
export class DelaysPageComponent {

  isLoading: false;
  selectedItems: any[] = []

}
