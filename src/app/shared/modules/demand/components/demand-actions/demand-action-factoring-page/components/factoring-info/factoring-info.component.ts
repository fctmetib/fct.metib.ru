import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";

@Component({
  selector: 'app-factoring-info',
  templateUrl: './factoring-info.component.html',
})
export class FactoringInfoComponent implements OnInit, OnDestroy {
  @Input()
  currentDemandInfo: any;

  @Output()
  sendMessage: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }
}
