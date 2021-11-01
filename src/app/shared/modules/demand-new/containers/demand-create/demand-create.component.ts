import { Component, Input, OnInit } from '@angular/core';
import { DemandAction } from '../../types/common/demand-action';

@Component({
  selector: 'demand-create',
  styleUrls: ['./demand-create.component.scss'],
  templateUrl: './demand-create.component.html'
})

export class DemandCreateComponent implements OnInit {

  public currentDemandAction: DemandAction;

  constructor() { }

  ngOnInit() { }
}
