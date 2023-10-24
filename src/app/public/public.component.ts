import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LocalStorageService } from '../shared/services/common/localstorage.service';

@Component({
  selector: 'public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class PublicComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.localStorageService.setValue('fromPublic', true);
  }

  ngOnDestroy() {
  }
}
