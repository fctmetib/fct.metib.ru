import { Component, EventEmitter, Inject, inject, Input, OnInit, Output } from '@angular/core';
import {FileDnd} from '../../../../../../../shared/ui-kit/drag-and-drop/interfaces/drop-box.interface'
import {DocumentReq} from '../../../../../requests/interfaces/request.interface'
import { downloadBase64File, extractBase64 } from '../../../../../../../shared/services/tools.service';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DemandService } from '../../../../services/demand.service';
import { catchError, finalize, map, Observable, of, switchMap, tap } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DrawerData } from '../../../../../../../shared/ui-kit/drawer/interfaces/drawer.interface';
import { DemandSignatureDrawerInterface } from '../../interfaces/demand-signature-drawer.interface';
import { DemandDataBaseInterface } from '../../../../types/demand-data-base.interface';
import { FileMode } from '../../../../../../../shared/types/file/file-model.interface';

@Component({
  selector: 'mib-demand-signature-fourth-step',
  templateUrl: './demand-signature-fourth-step.component.html',
  styleUrls: ['./demand-signature-fourth-step.component.scss']
})
export class DemandSignatureFourthStepComponent implements OnInit {
  @Output() changeDoc: EventEmitter<{ type: string, form: FormGroup }> = new EventEmitter<{ type: string, form: FormGroup }>()
  @Input() docFormData: FormGroup

  form: FormGroup
  private docType = 'completedAppScan'

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DrawerData
  ) {
  }

  get requestId(): number {
    return this.data.data.id
  }
  private demandService = inject(DemandService)

  ngOnInit() {
    this.initForms()
  }

  onDocumentLoad({file, url}: FileDnd): void {
    this.demandService.uploadDraftFile({
      Description: `description ${file.name}`,
      DocumentTypeID: 40,
      Title: file.name,
      OwnerTypeID: 20,
      Data: extractBase64(url),
      File: file
    }, 'completedAppScan', this.requestId).pipe(
      tap(fileMode => {
        this.addDocument(fileMode);
      }),
      catchError(error => {
        console.error(`Ошибка загрузки файла ${file.name}:`, error);
        return of(null);
      })
    ).subscribe()
  }

  private addDocument(data: FileMode): void {
    const control: FormGroup = this.fb.group({
      ID: [null],
      Identifier: [null],
      Code: [null],
      FileName: [null],
      Size: [null],
      DemandFileID: [null],
    });
    control.patchValue(data)
    this.documents.push(control);
    this.changeDoc.emit({ type: this.docType, form: this.form });
  }

  private initForms(): void {
    this.form = this.docFormData.get('AllDocuments') as FormGroup
  }

  get documents(): FormArray<any> {
    return this.form.get('completedAppScan') as FormArray
  }

  removeDocument(idx: number): void {
    const { DemandFileID } = this.documents.at(idx).getRawValue() as FileMode;

    this.demandService.deleteDemandFileById(DemandFileID).pipe(
      tap(() => {
        this.documents.removeAt(idx);
        this.changeDoc.emit({ type: this.docType, form: this.form });
      })
    ).subscribe();
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

  private getByID() {
    const isDraft = this.data?.data?.isEdit
    const req$ = isDraft ? this.demandService.getDemandDraftById(this.requestId) : this.demandService.getDemandById(this.requestId);
    return req$.pipe(
      map(res => isDraft ? res.DemandData : res.Data)
    )
  }


  public downloadFile() {
    this.getByID().pipe(
      switchMap(data => this.demandService.getDemandDocumentByType(data, 'DigitalSignatureRequest')),
      tap(response => {
        // Создаем ссылку для скачивания файла
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'DigitalSignatureRequest.docx'; // Название файла
        a.click();
        window.URL.revokeObjectURL(url);
      }),
      catchError(error => {
        console.error('Ошибка скачивания файла:', error);
        return of(error);
      })
    ).subscribe();
  }
}
