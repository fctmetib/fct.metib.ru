import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DemandNavigationService } from '../../services/demand-navigation.service';
import { DemandAction } from '../../types/common/demand-action';
import { DemandActionType } from '../../types/common/demand-action-type';
import { DemandNavigationInterface } from '../../types/common/demand-navigation.interface';
import { SaveDemandRequestInterface } from '../../types/requests/save-demand-request.interface';

@Component({
  selector: 'demand-create',
  styleUrls: ['./demand-create.component.scss'],
  templateUrl: './demand-create.component.html',
})
export class DemandCreateComponent implements OnInit, OnDestroy {
  @Output()
  submit = new EventEmitter();

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


  public onSubmit(form) {
    // Для всех форм при создании указывается DraftID = 0
    const requestData: SaveDemandRequestInterface<any> = {
      DraftID: 0,
      Data: form,
    };
    console.log('LEVEL 2', requestData)
    this.submit.emit(requestData);
  }

  public get demandAction(): typeof DemandAction {
    return DemandAction;
  }
}
