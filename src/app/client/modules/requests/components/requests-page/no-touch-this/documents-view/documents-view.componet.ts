import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'documents-view',
  template: `
<!--    <p-table [value]="documents">-->
<!--      <ng-template pTemplate="header">-->
<!--        <tr>-->
<!--          <th>-->
<!--            <div class="m-th">ID</div>-->
<!--          </th>-->
<!--          <th>-->
<!--            <div class="m-th">Номер</div>-->
<!--          </th>-->
<!--          <th>-->
<!--            <div class="m-th">Описание</div>-->
<!--          </th>-->
<!--          <th>-->
<!--            <div class="m-th">Название</div>-->
<!--          </th>-->
<!--        </tr>-->
<!--      </ng-template>-->
<!--      <ng-template pTemplate="body" let-document>-->
<!--        <tr class="can-click" (click)="viewDocument(document)">-->
<!--          <td>-->
<!--            <div class="m-td">-->
<!--              <div>-->
<!--                {{ document.DocumentID }}-->
<!--              </div>-->
<!--            </div>-->
<!--          </td>-->
<!--          <td>-->
<!--            <div class="m-td">-->
<!--              <div>-->
<!--                {{ document.Number }}-->
<!--              </div>-->
<!--            </div>-->
<!--          </td>-->
<!--          <td>-->
<!--            <div-->
<!--              class="m-td"-->
<!--              tooltipPosition="bottom"-->
<!--              pTooltip="{{ document.Description }}"-->
<!--            >-->
<!--              <div>-->
<!--                {{ document.Description }}-->
<!--              </div>-->
<!--            </div>-->
<!--          </td>-->
<!--          <td>-->
<!--            <div class="m-td">-->
<!--              <div>-->
<!--                {{ document.Title }}-->
<!--              </div>-->
<!--            </div>-->
<!--          </td>-->
<!--        </tr>-->
<!--      </ng-template>-->
<!--      <ng-template pTemplate="emptymessage">-->
<!--        <tr>-->
<!--          <td colspan="4">Документов, для этой заявки нет.</td>-->
<!--        </tr>-->
<!--      </ng-template>-->
<!--    </p-table>-->
  `,
})
export class DocumentsViewComponent implements OnInit {
  @Input()
  documents: any[];

  @Output()
  documentView: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  public viewDocument(document: any) {
    this.documentView.emit(document);
  }
}
