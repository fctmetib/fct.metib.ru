import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MIBCommon } from 'src/app/shared/classes/common/mid-common.class';
import { IReportCard } from '../../../cabinet/types/common/i-report.card';
import { ReportService } from 'src/app/shared/services/common/report.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { drawerConfig } from '../../../../../shared/ui-kit/drawer/drawer.tools';
import { ReportAggregateDrawerComponent } from '../drawers/report-agregate-drawer/report-aggregate-drawer.component';
import {
  ReportAggregateDeliveryDrawerComponent
} from '../drawers/report-agregate-delivery-drawer/report-aggregate-delivery-drawer.component';
import {
  ReportAccreditiveDrawerComponent
} from '../drawers/report-accreditive-drawer/report-accreditive-drawer.component';
import {
  ReportExtractExternalDrawerComponent
} from '../drawers/report-extract-external-drawer/report-extract-external-drawer.component';
import {
  ReportShipmentCorrectionDrawerComponent
} from '../drawers/report-shipment-correction-drawer/report-shipment-correction-drawer.component';
import {
  ReportDocumentsIncomeDrawerComponent
} from '../drawers/report-documents-income-drawer/report-documents-income-drawer.component';
import {
  ReportCustomerFinansingDrawerComponent
} from '../drawers/report-customer-finansing-drawer/report-customer-finansing-drawer.component';
import {
  ReportPaymentAllDrawerComponent
} from '../drawers/report-payment-all-drawer/report-payment-all-drawer.component';
import {
  ReportCommissionDrawerComponent
} from '../drawers/report-commission-drawer/report-commission-drawer.component';
import {
  ReportDebtorDelayDrawerComponent
} from '../drawers/report-debtor-delay-drawer/report-debtor-delay-drawer.component';
import {
  ReportPaymentsIncomeDrawerComponent
} from '../drawers/report-payments-income-drawer/report-payments-income-drawer.component';
import {
  ReportProtocolDrawerComponent
} from '../drawers/report-protocol-drawer/report-protocol-drawer.component';
import { ReportInvoicesDrawerComponent } from '../drawers/report-invoices-drawer/report-invoices-drawer.component';
import {
  ReportOrderPostingsDrawerComponent
} from '../drawers/report-order-postings-drawer/report-order-postings-drawer.component';
import { ReportDebtorDrawerComponent } from '../drawers/report-debtor-drawer/report-debtor-drawer.component';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss'],
})
export class ReportsPageComponent implements OnInit {
  reportCards: IReportCard[] = [];
  ref: MatDialogRef<any>;

  private reportService = inject(ReportService)
  private router = inject(Router)
  dialog = inject(MatDialog)

  // TODO: СДЕЛАТЬ НА ВСЕ ЭТИ ОТЧЕТЫ ПО ДРАВЕРУ
  drawers = {
    "DocumentsIncome": ReportDocumentsIncomeDrawerComponent,
    "Agregate": ReportAggregateDrawerComponent,
    "CustomerFinansing": ReportCustomerFinansingDrawerComponent,
    "PaymentAll": ReportPaymentAllDrawerComponent,
    "Accreditive": ReportAccreditiveDrawerComponent,
    "ShipmentCorrection": ReportShipmentCorrectionDrawerComponent,
    "Commission": ReportCommissionDrawerComponent,
    "DebtorDelay": ReportDebtorDelayDrawerComponent,
    "PaymentsIncome": ReportPaymentsIncomeDrawerComponent,
    "ExtractExternal": ReportExtractExternalDrawerComponent,
    "AgregateDelivery": ReportAggregateDeliveryDrawerComponent,
    "ReportProtocol": ReportProtocolDrawerComponent,
    "Invoices": ReportInvoicesDrawerComponent,
    "OrderPostings": ReportOrderPostingsDrawerComponent,
    "DebtorReport": ReportDebtorDrawerComponent,
  }

  ngOnInit() {
    let mibCommon = new MIBCommon();
    this.reportCards = mibCommon.getReports();
  }

  openReportDrawer(reportCard: IReportCard) {
    this.ref = this.dialog.open(this.drawers[reportCard.type], drawerConfig(640, reportCard));
  }

  private openReportDetails(data) {
    this.reportService.reportData$.next(data);
    this.router.navigate(['/client/reports/report-view']);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
