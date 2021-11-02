import { Component, Input, OnInit } from '@angular/core';
import { DemandNavigationService } from '../../services/demand-navigation.service';
import { DemandAction } from '../../types/common/demand-action';

@Component({
  selector: 'demand-create',
  styleUrls: ['./demand-create.component.scss'],
  templateUrl: './demand-create.component.html',
})
export class DemandCreateComponent implements OnInit {
  public currentDemandAction: DemandAction;

  constructor(private _demandNavigationService: DemandNavigationService) {}

  ngOnInit() {}
}
