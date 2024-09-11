import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DrawerData} from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface';
import {FreeDutyRequestDrawerComponent} from './free-duty-request-drawer.component';
import {drawerConfig} from '../../../../../shared/ui-kit/drawer/drawer.tools';
import {Duty} from '../../../../../shared/types/duty/duty';

@Injectable()
export class FreeDutyRequestDrawerService {

  constructor(
    private dialog: MatDialog
  ) {
  }

  open(data?: DrawerData<Duty[]>): MatDialogRef<FreeDutyRequestDrawerComponent, number[]> {
    const config: DrawerData = {
      state: 'view'
    }
    return this.dialog.open(FreeDutyRequestDrawerComponent, drawerConfig(data?.maxWidth, Object.assign(config, data)))
  }
}
