import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  ViewChild,
  TemplateRef,
  ContentChild,
} from "@angular/core";
import { MibTabBodyComponent } from "../mib-tab-body/mib-tab-body.component";
import { MibTabLabelComponent } from "../mib-tab-label/mib-tab-label.component";

@Component({
  selector: "mib-tab-item",
  template: "<ng-content></ng-content>",
})
export class MibTabItemComponent implements OnInit {
  @Input()
  label: string;

  @Input()
  isActive: boolean;

  @ContentChild(MibTabBodyComponent)
  bodyComponent: MibTabBodyComponent;

  @ContentChild(MibTabLabelComponent)
  labelComponent: MibTabLabelComponent;

  constructor() {}

  ngOnInit(): void {}
}
