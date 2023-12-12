import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface'
import {drawerConfig} from '../../../../../shared/ui-kit/drawer/drawer.tools'
import {DeliveryAgreementDrawerComponent} from './delivery-agreement-drawer.component';
import {DeliveryAgreement} from './interfaces/delivery-agreement.interface';

@Injectable()
export class DeliveryAgreementDrawerService {
  constructor(private dialog: MatDialog) {
  }

  open<T>(data?: DrawerData<T>): MatDialogRef<DeliveryAgreementDrawerComponent, DeliveryAgreement> {
    const config: DrawerData = {
      state: 'view',
    }
    return this.dialog.open(
      DeliveryAgreementDrawerComponent,
      drawerConfig(data?.maxWidth, Object.assign(config, data))
    )
  }
}
