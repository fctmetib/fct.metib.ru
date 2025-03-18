import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileDnd } from 'src/app/shared/ui-kit/drag-and-drop/interfaces/drop-box.interface';
import { DocumentReq } from '../../../requests/interfaces/request.interface';
import { downloadBase64File, extractBase64 } from 'src/app/shared/services/tools.service';
import { DrawerData } from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputSize } from '../../../../../shared/ui-kit/input/interfaces/input.interface';
import { ButtonSize } from '../../../../../shared/ui-kit/button/interfaces/button.interface';
import { DemandService } from '../../services/demand.service';
import { DestroyService } from '../../../../../shared/services/common/destroy.service';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter, finalize,
  Observable, of,
  pairwise,
  startWith,
  switchMap,
  tap,
  throwError
} from 'rxjs';
import {
  RequestFailureModalService
} from '../../../../../shared/modules/modals/request-failure-modal/request-failure-modal.service';
import {
  RequestCreateSuccessModalService
} from '../../../../../shared/modules/modals/request-create-success-modal/request-create-success-modal.service';
import { DemandsPrepareEnum } from '../../pages/demand-new-home/demand-new-home.component';
import { FileMode } from '../../../../../shared/types/file/file-model.interface';
import { DemandStatus } from '../../types/demand-status';
import { DemandDrawerService } from '../demand-drawer/demand-drawer.service';
import { Properties } from 'csstype';
import { DemandInterface } from '../../types/demand.interface';
import { DataField } from '../../../reports/components/dynamic-data/dynamic-data.component';


export type DocumentsType =
  'statement'
  | 'reporting'
  | 'informationLetter'


export const DemandLimitDataConfig: DataField[] = [
  { label: 'Лимит', key: 'Limit', type: 'currency' },
  { label: 'Комментарий', key: 'Comment', type: 'text' },
]

@Component({
  selector: 'mib-demand-limit-drawer',
  templateUrl: './demand-limit-drawer.component.html',
  styleUrls: ['./demand-limit-drawer.component.scss'],
  providers: [DestroyService]
})
export class DemandLimitDrawerComponent implements OnInit {
  @Output() documentLoad = new EventEmitter<any>();
  isSubmitting$ = new BehaviorSubject<boolean>(false);
  loading$ = new BehaviorSubject<boolean>(false);
  limit: number = 0;
  form: FormGroup;
  groupDocuments: FormGroup;
  size: InputSize | ButtonSize = 'm';
  limitRequestType = 'Limit';
  tabIndex = '1'
  public viewingData: DemandInterface<any>;

  DemandStatus = DemandStatus;
  public status: DemandStatus = DemandStatus.edit;
  public skeleton: Properties = {
    borderRadius: '8px',
    height: '95px',
    width: '100%'
  }

  identify(index, item) {
    return item.DemandMessageID
  }

  private titleInfo = {create: null, update: null, status: null}

  private fb = inject(FormBuilder);
  private demandService = inject(DemandService);
  private requestFailureModalService = inject(RequestFailureModalService);
  private requestCreateSuccessModalService = inject(RequestCreateSuccessModalService);
  private demandDrawerService = inject(DemandDrawerService);
  dialogRef = inject<MatDialogRef<DemandLimitDrawerComponent>>(MatDialogRef);
  data = inject<DrawerData>(MAT_DIALOG_DATA);
  messageForm: FormGroup;
  DemandLimitDataConfig: DataField[] = DemandLimitDataConfig;

  get date(): {create: string, update: string, status: string} {
    return this.titleInfo
  }

  ngOnInit() {
    const modalData = this.data.data;
    this.initForm();
    this.initMessageForm()
    this.initGroupDocuments();

    if (this.isView) {
      this.form.disable();
      this.groupDocuments.disable();
    }

    const demandId = modalData?.id;
    if (demandId) this.getAndPatchDemandById(demandId);

    if (modalData?.isView || modalData?.isEdit) {
      modalData?.isView ? this.status = DemandStatus.view : null;
    }

    // Если создание и нет черновика
    if (modalData?.isCreation && !modalData?.id) {
      // инициализируем черновик
      this.initDraft();
      // Запрашиваем метод prepare для предзаполнения инпутов
      this.prepareDemandByTypes(modalData.prepareTypeId);
      // Включаем авто сохранение первого/второго таба
      this.enableAutoSaveDraft(this.form);
    }

    // Если создание и есть черновик
    if (modalData?.isCreation || modalData?.isEdit) {
      // Включаем авто сохранение первого/второго таба
      this.enableAutoSaveDraft(this.form);
    }
  }

  private getAndPatchDemandById(id: number): void {
    this.loading$.next(true);

    const req$ = this.data.data?.isEdit ? this.demandService.getDemandDraftById(id) : this.demandService.getDemandById(id);

    req$.pipe(
      tap(res => {
        this.viewingData = res;

        const demandData = res?.DemandData || res?.Data;
        const files = res?.Files || demandData?.Files;

        if (files) {
          for (let file of files as FileMode[]) {
            this.addDocumentControlByType(file, file.Identifier);
          }
        }

        this.form.patchValue({
          Limit: demandData?.Limit,
          Comment: demandData?.Comment,
          Files: demandData?.Files
        }, { emitEvent: false });

        if (!this.data.data?.isEdit) {
          this.titleInfo = { create: res.DateCreated, update: res.DateModify, status: this.getStatus(res.Status) };
        }
      }),
      finalize(() => this.loading$.next(false))
    ).subscribe();
  }

  private getStatus(status: string): string {
    let result: string = '';
    switch (status) {
      case 'Created':
        result = 'Создан';
        break;
      case 'Completed':
        result = 'Завершен';
        break;
      case 'Processing':
        result = 'В процессе';
        break;
      case 'Rejected':
        result = 'Отклонено';
        break;
      case 'Draft':
        result = 'Черновик';
        break;
      case 'Canceled':
        result = 'Отменен';
        break;
    }
    return result;
  }

  get requestId(): number {
    return this.data.data.id;
  }

  set requestId(val: number) {
    this.data.data.id = val;
  }

  get isView(): boolean {
    return this.data.data.isView;
  }

  private initForm() {
    this.form = this.fb.group({
      Limit: ['', [Validators.required]],
      Comment: ['', [Validators.required]],
      Type: [this.limitRequestType],
      Files: this.fb.array([])
    });
  }


  private initMessageForm() {
    this.messageForm = this.fb.group({
      FileCode: [''],
      Comment: ['', Validators.required],
    })
  }

  private prepareDemandByTypes(type: DemandsPrepareEnum) {
    this.loading$.next(true)
    this.demandService.prepareDemandByTypes(type)
      .pipe(
        finalize(() => this.loading$.next(false)),
      )
      .subscribe(res => {
          console.log('prepareDemandByTypes=>', res);
          this.patchData(res);
        }
      );
  }

  private patchData(data: any) {
    this.form.patchValue({
      Limit: data.Limit,
      Comment: data.Comment,
      Type: data.Type,
      Files: data.Files
    });
  }

  private initDraft(): void {
    const payload = {
      Limit: '',
      Comment: '',
      Type: this.limitRequestType,
      Files: []
    };

    this.demandService
      .createNewDraft(payload)
      .pipe(
        tap(id => {
          this.requestId = id;
        })
      )
      .subscribe();
  }

  private initGroupDocuments() {
    this.groupDocuments = this.fb.group({
      statement: this.fb.array([]),
      reporting: this.fb.array([]),
      informationLetter: this.fb.array([])
    });
  }

  onDocumentLoad({ file, url }: FileDnd, type: DocumentsType) {
    this.uploadDocumentToDraft({
      Description: `description ${file.name}`,
      DocumentTypeID: 40, // TODO: Узнать, статичен ли тип файла. Найти енам с "ключ/значение"
      Title: file.name,
      OwnerTypeID: 20, // TODO: Скорее всего, нужно тянуть id из объекта пользователя
      Data: extractBase64(url),
      File: file
    }, type).pipe(
      tap(doc => {
        this.shiftDocumentControlByType(doc, type);
      })
    ).subscribe();
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

  uploadDocumentToDraft(req: DocumentReq, docType: DocumentsType): Observable<FileMode> {

    return this.demandService.uploadDraftFile(req.File, docType, this.requestId).pipe(
      catchError((err, caught) => {
        console.error(`Ошибка загрузки файла ${req.Title}:`, err);
        return of(err);
      })
    );
  }

  getGroupDocumentsFormByType(type: DocumentsType) {
    return this.groupDocuments.get(type) as FormArray;
  }

  get documents() {
    return this.form.get('documents') as FormArray;
  }

  deleteDocument(i: number, docType: DocumentsType) {
    const groupByType = this.getGroupDocumentsFormByType(docType);
    const { DemandFileID } = groupByType.at(i).getRawValue() as FileMode;

    this.demandService.deleteDemandFileById(DemandFileID).pipe(
      tap(() => {
        groupByType.removeAt(i);
      })
    ).subscribe();
  }

  private openRequestFailureModal(d): void {
    this.requestFailureModalService.open(d);
  }

  private openRequestSuccessModal(): void {
    this.requestCreateSuccessModalService.open();
  }

  submitData() {
    this.isSubmitting$.next(true);
    const resObj = {
      draftId: this.requestId
    };
    this.demandService.createDemand(resObj)
      .subscribe({
        complete: () => {
          this.dialogRef.close();
          this.openRequestSuccessModal();
        },
        error: () => {
          this.dialogRef.close();
          this.openRequestFailureModal(this.requestId);
        }
      });
  }

  sendMessage() {
    this.isSubmitting$.next(true)
    this.demandService.sendDemandsMessage(this.messageForm.value, this.data.data.id)
      .subscribe({
        complete: () => {
          const modalData = this.data.data
          this.getAndPatchDemandById(modalData.id)
          this.resetMessageModal()
          this.isSubmitting$.next(false)
        },
        error: () => {
          this.dialogRef.close()
          this.openRequestFailureModal(this.requestId)
        }
      })
  }

  downloadCurrentFile(document: AbstractControl): void {
    //
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

    //
    // this.documentsService
    //   .getDocumentContent(DemandFileID)
    //   .pipe(
    //     tap(data => {
    //       downloadBase64File(data, FileName)
    //     })
    //   )
    //   .subscribe()

    // this.isDownloading$.next(true)
    // this.documentsService
    // 	.getDocumentContent(this.documents.DocumentID)
    // 	.pipe(
    // 		tap(data => {
    // 			downloadBase64File(data, DocTitle)
    // 		}),
    // 		finalize(() => {
    // 			this.isDownloading$.next(false)
    // 		})
    // 	)
    // 	.subscribe()
  }

  deleteFile() {
    const modalData = this.data.data
    this.getAndPatchDemandById(modalData.id)
  }

  private resetMessageModal() {
    this.initMessageForm()
    this.demandDrawerService.updateDocumentsState(undefined)
  }

  private hasFormChanged(prev: any, curr: any): boolean {
    return JSON.stringify(prev) !== JSON.stringify(curr);
  }

  private saveDraft() {
    const payload = this.createDraftPayload();

    return this.demandService.updateDraft(this.requestId, payload).pipe(
      switchMap((draftResult) => {
        if (!draftResult) {
          return throwError(() => new Error('Ошибка сохранения черновика'));
        }
        return of(draftResult);
      })
    );
  }

  private createDraftPayload(): any {
    return {
      Limit: this.form.get('Limit').value,
      Comment: this.form.get('Comment').value,
      Type: this.limitRequestType
    };
  }

  private onSaveDraftSuccess(result: any): void {
    console.log('Черновик и файлы успешно сохранены:', result);
  }

  private onSaveDraftError(error: any): void {
    console.error('Ошибка при сохранении черновика или файлов:', error);
  }

  private enableAutoSaveDraft(form: FormGroup | AbstractControl): void {
    form.valueChanges
      .pipe(
        filter(() => !!this.requestId), // Предпочтительно использовать requestId напрямую
        debounceTime(500), // Ждем 500 мс после окончания ввода
        distinctUntilChanged(), // Запрос будет отправлен только если данные изменились
        startWith(form.value), // Начальное значение формы
        pairwise(), // Получаем текущее и предыдущее значения формы
        filter(([prev, curr]) => this.hasFormChanged(prev, curr)), // Проверка изменений формы
        switchMap(([prev, curr]) => this.saveDraft()) // Сохранение черновика
      )
      .subscribe({
        next: result => this.onSaveDraftSuccess(result), // Успешная обработка черновика
        error: error => this.onSaveDraftError(error) // Обработка ошибок
      });
  }
}
