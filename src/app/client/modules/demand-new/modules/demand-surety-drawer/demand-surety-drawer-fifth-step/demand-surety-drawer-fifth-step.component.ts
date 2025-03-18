import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import {FileDnd} from '../../../../../../shared/ui-kit/drag-and-drop/interfaces/drop-box.interface'
import {DocumentReq} from '../../../../requests/interfaces/request.interface'
import { downloadBase64File, extractBase64 } from '../../../../../../shared/services/tools.service';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FileMode } from '../../../../../../shared/types/file/file-model.interface';
import { catchError, Observable, of, tap } from 'rxjs';
import { DemandService } from '../../../services/demand.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

type DocumentsType  =
  'charter'
  | 'ceoPassport'
  | 'foundingDecision'
  | 'appointmentOrder'
  | 'balanceSheet'
  | 'turnoverBalanceSheet'
  | 'foundersPassports'

@Component({
  selector: 'mib-demand-surety-drawer-fifth-step',
  templateUrl: './demand-surety-drawer-fifth-step.component.html',
  styleUrls: ['./demand-surety-drawer-fifth-step.component.scss']
})
export class DemandSuretyDrawerFifthStepComponent implements OnInit {
  @Output() changeDoc: EventEmitter<any> = new EventEmitter<any>()
  @Input() formGroup: FormGroup
  form: FormGroup
  doc: DocumentsType

  private demandService = inject(DemandService)
  private fb = inject(FormBuilder)
  data = inject(MAT_DIALOG_DATA)

  get requestId(): number {
    return this.data.data.id;
  }

  ngOnInit() {
    this.initForms();
  }

  getGroupDocumentsFormByType(type: string) {
    return this.form.get(type) as FormArray;
  }

  createDocumentControl(data: FileMode) {
    const control = this.fb.group({
      ID: [null],
      Identifier: [null],
      Code: [null],
      FileName: [null],
      Size: [null],
      DemandFileID: [null]
    });
    control.patchValue(data);
    return control;
  }

  addDocumentControlByType(data: FileMode, type: DocumentsType) {
    this.getGroupDocumentsFormByType(type).push(this.createDocumentControl(data));
  }

  shiftDocumentControlByType(data: FileMode, type: DocumentsType) {
    this.getGroupDocumentsFormByType(type).insert(0, this.createDocumentControl(data));
  }

  onDocumentLoad({file, url}: FileDnd, type: DocumentsType): void {
    this.uploadDocumentToDraft({
      Description: `description ${file.name}`,
      DocumentTypeID: 40,
      Title: file.name,
      OwnerTypeID: 20,
      Data: extractBase64(url),
      File: file
    }, type).pipe(
      tap(doc => {
        this.shiftDocumentControlByType(doc, type);
      })
    ).subscribe();
  }

  uploadDocumentToDraft(req: DocumentReq, docType: DocumentsType): Observable<FileMode> {

    return this.demandService.uploadDraftFile(req.File, docType, this.requestId).pipe(
      catchError((err, caught) => {
        console.error(`Ошибка загрузки файла ${req.Title}:`, err);
        return of(err);
      })
    );
  }

  removeDocument(idx: number, type: DocumentsType): void {
    this.getGroupDocumentsFormByType(type).removeAt(idx)
    this.changeDoc.emit()
  }

  private initForms(): void {
    this.form = this.formGroup
  }

  downloadCurrentFile(document: AbstractControl): void {
    const { DemandFileID, FileName } = document.getRawValue() as FileMode;

    this.demandService
      .downloadFile(DemandFileID).pipe(
      tap(data => {
        downloadBase64File(data, FileName);
      }),
      catchError(error => {
        console.error(`Ошибка при скачивании файла "${FileName}":`, error);
        return of(null);
      })
    )
      .subscribe();

  }

  deleteDocument(idx: number, type: string) {
    const groupByType = this.getGroupDocumentsFormByType(type);
    const { DemandFileID } = groupByType.at(idx).getRawValue() as FileMode;

    this.demandService.deleteDemandFileById(DemandFileID).pipe(
      tap(() => {
        groupByType.removeAt(idx);
      })
    ).subscribe();
  }
}
