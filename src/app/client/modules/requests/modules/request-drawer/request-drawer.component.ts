import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface'
import {AdvancedRequests} from '../../pages/requests-page/interfaces/requests-page.interface'
import {ToolsService} from '../../../../../shared/services/tools.service'
import {RequestDrawerService} from './request-drawer.service'
import {BehaviorSubject} from 'rxjs'
import {InputSize} from '../../../../../shared/ui-kit/input/interfaces/input.interface';
import {ButtonSize} from '../../../../../shared/ui-kit/button/interfaces/button.interface';
import {DeliveryAgreementDrawerService} from '../delivery-agreement-drawer/delivery-agreement-drawer.service';

@Component({
  selector: 'mib-request-drawer',
  templateUrl: './request-drawer.component.html',
  styleUrls: ['./request-drawer.component.scss']
})
export class RequestDrawerComponent implements OnInit {
  public sending$ = new BehaviorSubject<boolean>(false)

  public size: InputSize | ButtonSize = 'm'

  constructor(
    public dialogRef: MatDialogRef<RequestDrawerComponent>,
    public toolsService: ToolsService,
    private requestsService: RequestDrawerService,
    private deliveryAgreementDrawerService: DeliveryAgreementDrawerService,
    @Inject(MAT_DIALOG_DATA) public data: DrawerData<AdvancedRequests[]>
  ) {
  }

  ngOnInit() {
  }

  openDeliveryAgreement() {
    this.deliveryAgreementDrawerService.open({maxWidth: 492})
  }

}
