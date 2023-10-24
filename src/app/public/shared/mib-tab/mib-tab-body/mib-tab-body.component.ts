import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";

@Component({
  selector: "mib-tab-body",
  styleUrls: ['./mib-tab-body.component.scss'],
  template: "<ng-template><ng-content></ng-content></ng-template>"
})
export class MibTabBodyComponent implements OnInit {
  @ViewChild(TemplateRef)
  bodyContent: TemplateRef<any>;

  constructor() {}

  ngOnInit(): void {}
}
