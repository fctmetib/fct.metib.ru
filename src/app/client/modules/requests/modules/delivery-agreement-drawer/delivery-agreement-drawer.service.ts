import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface'
import {drawerConfig} from '../../../../../shared/ui-kit/drawer/drawer.tools'
import {DeliveryAgreementDrawerComponent} from './delivery-agreement-drawer.component';

@Injectable()
export class DeliveryAgreementDrawerService {
  constructor(private dialog: MatDialog) {
  }

  open<T>(data?: DrawerData<T>): MatDialogRef<DeliveryAgreementDrawerComponent, number[]> {
    const config: DrawerData = {
      state: 'view',
    }
    return this.dialog.open(
      DeliveryAgreementDrawerComponent,
      drawerConfig(data?.maxWidth, Object.assign(config, data))
    )
  }
}
