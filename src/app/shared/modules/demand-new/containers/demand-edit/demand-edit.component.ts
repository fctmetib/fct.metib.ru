import { DoDemandActionInterface } from '../../types/navigation-service/do-demand-action.interface';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DemandNavigationService } from '../../services/demand-navigation.service';
import { DemandAction } from '../../types/common/demand-action';
import { DemandActionType } from '../../types/common/demand-action-type';
import { DemandNavigationInterface } from '../../types/common/demand-navigation.interface';
import { SaveDemandRequestInterface } from '../../types/requests/save-demand-request.interface';

@Component({
  selector: 'demand-edit',
  styleUrls: ['./demand-edit.component.scss'],
  templateUrl: './demand-edit.component.html',
})
export class DemandEditComponent implements OnInit, OnDestroy {
  public demandNavigationConfig: DemandNavigationInterface;
  private _subscription$: Subscription = new Subscription();

  constructor(
    private _router: Router,
    private _demandNavigationService: DemandNavigationService
  ) {}

  ngOnInit() {
    this._subscription$.add(
      this._demandNavigationService.demandConfig$.subscribe((demandConfig) => {
        this.demandNavigationConfig = demandConfig;
      })
    );
  }

  ngOnDestroy() {
    this._subscription$.unsubscribe();
  }

  public get demandAction(): typeof DemandAction {
    return DemandAction;
  }
}
