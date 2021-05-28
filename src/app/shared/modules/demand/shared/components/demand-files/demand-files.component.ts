import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";

@Component({
  selector: 'app-demand-files',
  templateUrl: './demand-files.component.html',
  styleUrls: ['./demand-files.component.scss']
})
export class DemandFilesComponent implements OnInit, OnDestroy {
  @Input()
  currentDemandFiles: any;

  @Output()
  addFile: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }
}
