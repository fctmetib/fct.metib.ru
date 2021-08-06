import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'documents-view',
  template: `
    <p-table [value]="documents">
      <ng-template pTemplate="header">
        <tr>
          <th>
            <div class="m-th">ID</div>
          </th>
          <th>
            <div class="m-th">Номер</div>
          </th>
          <th>
            <div class="m-th">Описание</div>
          </th>
          <th>
            <div class="m-th">Название</div>
          </th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-document>
        <tr>
          <td>
            <div class="m-td">
              {{ document.DocumentID }}
            </div>
          </td>
          <td>
            <div class="m-td">
              {{ document.Number }}
            </div>
          </td>
          <td>
            <div class="m-td">
              {{ document.Description }}
            </div>
          </td>
          <td>
            <div class="m-td">
              {{ document.Title }}
            </div>
          </td>
        </tr>
      </ng-template>
      <ng-template pTemplate="emptymessage">
        <tr>
          <td colspan="4">Документов, для этой заявки нет.</td>
        </tr>
      </ng-template>
    </p-table>
  `,
})
export class DocumentsViewComponent implements OnInit {
  @Input()
  documents: any[];

  constructor() {}

  ngOnInit() {}
}
