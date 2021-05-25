import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";

@Component({
  selector: 'app-factoring-files',
  templateUrl: './factoring-files.component.html',
})
export class FactoringFilesComponent implements OnInit, OnDestroy {
  @Input()
  currentDemandFiles: any;

  @Output()
  addFile: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }
}
