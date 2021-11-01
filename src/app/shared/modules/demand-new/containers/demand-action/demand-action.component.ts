import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandAction } from '../../types/common/demand-action';
import { DemandActionType } from '../../types/common/demand-action-type';

@Component({
  selector: 'demand-action',
  styleUrls: ['./demand-action.component.scss'],
  templateUrl: './demand-action.component.html',
})
export class DemandActionComponent implements OnInit {
  public isUserVerified: boolean = true;
  public isLoading: boolean = false;
  public actionName: string = 'Запрос на ЭЦП';

  public currentDemandAction: DemandAction;
  public currentDemandType: DemandActionType;

  constructor(private _router: Router) {}

  ngOnInit() {

  }

  public back() {
    const notVerify = 'not-verify';
    const baseUrl = this.isUserVerified ? '' : notVerify;
    this._router.navigate([`${baseUrl}/demand`]);
  }

  public get demandType(): typeof DemandActionType {
    return DemandActionType;
  }
}
