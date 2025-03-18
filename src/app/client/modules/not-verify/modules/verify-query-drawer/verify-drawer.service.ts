import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { drawerConfig } from 'src/app/shared/ui-kit/drawer/drawer.tools';
import { DrawerData } from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface';
import { VerifyQueryDrawerComponent } from './verify-query-drawer.component';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VerifyDrawerService {

  constructor(private dialog: MatDialog) {
  }

  open(data?: DrawerData<any>): MatDialogRef<VerifyQueryDrawerComponent> {
    const config: DrawerData = {
      state: 'view'
    };
    return this.dialog.open(
      VerifyQueryDrawerComponent,
      drawerConfig(data?.maxWidth, Object.assign(config, data))
    );
  }

}
