import {AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import {tap} from "rxjs";
import {NavbarPointSize, NavbarPointType} from './interfaces/navbar-point.interface';
import {NavbarPointComponent} from './components/navbar-point/navbar-point.component';

@Component({
  selector: 'mib-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterContentInit {

  @Input() type: NavbarPointType = 'separator'
  @Input() size: NavbarPointSize = 'l'

  @ContentChildren(NavbarPointComponent, {descendants: true}) navbarPoints!: QueryList<NavbarPointComponent>

  constructor() {
  }

  get classes() {
    return {
      [`navbar_${this.type}`]: true
    }
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.setNavbarPointsSize()
    this.navbarPoints.changes.pipe(
      tap(this.setNavbarPointsSize)
    ).subscribe()
  }

  public setNavbarPointsSize = () => {
    console.log(this.navbarPoints)
    this.navbarPoints.forEach(point => {
      point.size = this.size;
      point.type = this.type
    })
  }
}
