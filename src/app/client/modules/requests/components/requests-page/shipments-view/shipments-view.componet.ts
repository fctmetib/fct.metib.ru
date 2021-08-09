import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shipments-view',
  template: `
    <p-table [value]="shipments">
      <ng-template pTemplate="header">
        <tr>
          <th>
            <div class="m-th">ID</div>
          </th>
          <th>
            <div class="m-th">Накладная</div>
          </th>
          <th>
            <div class="m-th">Дата</div>
          </th>
          <th>
            <div class="m-th">Сумма</div>
          </th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-shipment>
        <tr>
          <td>
            <div class="m-td">
              <div>
                {{ shipment.ID }}
              </div>
            </div>
          </td>
          <td>
            <div class="m-td">
              <div>
                {{ shipment.InvoiceNumber }}
              </div>
            </div>
          </td>
          <td>
            <div class="m-td">
              <div>
                {{ shipment.DateShipment | date: 'dd.MM.yyyy' }}
              </div>
            </div>
          </td>
          <td>
            <div class="m-td currency">
              <div>
                {{ shipment.Summ | currency: 'RUB':'symbol-narrow' }}
              </div>
            </div>
          </td>
        </tr>
      </ng-template>
      <ng-template pTemplate="emptymessage">
        <tr>
          <td colspan="4">Накладных, для этой заявки нет.</td>
        </tr>
      </ng-template>
    </p-table>
  `,
})
export class ShipmentsViewComponent implements OnInit {
  @Input()
  shipments: any[];

  constructor() {}

  ngOnInit() {}
}
