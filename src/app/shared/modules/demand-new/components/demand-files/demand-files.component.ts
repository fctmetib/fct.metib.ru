import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FileModeInterface } from 'src/app/shared/types/file/file-model.interface';
import { DemandNavigationService } from '../../services/demand-navigation.service';
import { DoDemandActionInterface } from '../../types/navigation-service/do-demand-action.interface';
import { DoDemandPageActionType } from '../../types/navigation-service/do-demand-page-action-type';

@Component({
  selector: 'demand-files',
  templateUrl: './demand-files.component.html',
  styleUrls: ['./demand-files.component.scss'],
})
export class DemandFilesComponent implements OnInit, OnDestroy {
  public currentDemandFiles: FileModeInterface[] = [];

  private _subscription$: Subscription = new Subscription();

  constructor(private _demandNavigationService: DemandNavigationService) {}

  ngOnInit() {
    this._initValues();
  }

  ngOnDestroy() {
    this._subscription$.unsubscribe();
  }

  remove(file: FileModeInterface) {
    const doActionData: DoDemandActionInterface = {
      data: file,
      type: DoDemandPageActionType.REMOVE_FILE,
    };

    this._demandNavigationService.setDoDemandAction(doActionData);
  }

  private _initValues(): void {
    this._demandNavigationService.currentDemandInfoData$.subscribe(
      (demandData) => {
        this.currentDemandFiles = demandData.Files;
      }
    );
  }
}
