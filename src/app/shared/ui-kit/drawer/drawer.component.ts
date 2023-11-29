import {Component} from '@angular/core';
import {drawerAnimation} from "./drawer.animations";

@Component({
  selector: 'mib-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  animations: [
    drawerAnimation
  ]
})
export class DrawerComponent {

}
