import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from "./navbar.component";
import {NavbarPointComponent} from './components/navbar-point/navbar-point.component';


@NgModule({
  declarations: [
    NavbarComponent,
    NavbarPointComponent
  ],
    exports: [
        NavbarComponent,
        NavbarPointComponent
    ],
  imports: [
    CommonModule
  ]
})
export class NavbarModule {
}
