import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class PublicComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }
}
