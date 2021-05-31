import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-free-data',
  templateUrl: './free-data.component.html',
})
export class FreeDataComponent implements OnInit, OnDestroy {
  @Input()
  isEdit: boolean;

  @Input()
  currentDemand: any;

  @Input()
  currentDraftId: any;

  @Output()
  save: EventEmitter<any> = new EventEmitter();

  @Output()
  create: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
