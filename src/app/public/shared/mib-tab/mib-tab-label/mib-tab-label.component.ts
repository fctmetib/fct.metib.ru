import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'mib-tab-label',
  template: `<ng-template><ng-content></ng-content></ng-template>`
})

export class MibTabLabelComponent implements OnInit {
  @ViewChild(TemplateRef)
  labelContent: TemplateRef<any>;

  constructor() { }

  ngOnInit() { }
}
