import { Component, OnInit } from '@angular/core';
import { DemandActionType } from '../../types/common/demand-action-type';

@Component({
  selector: 'demand-container',
  styleUrls: ['./demand-container.component.scss'],
  templateUrl: './demand-container.component.html',
})
export class DemandContainerComponent implements OnInit {
  public currentDemandType: DemandActionType = DemandActionType.EDIT_CREATED;

  constructor() {}

  ngOnInit() {}

  public get demandType(): typeof DemandActionType {
    return DemandActionType;
  }
}
