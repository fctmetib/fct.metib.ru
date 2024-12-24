import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DrawerData } from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface';
import { DemandService } from '../../services/demand.service';
import { DestroyService } from '../../../../../shared/services/common/destroy.service';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import {
  BehaviorSubject, catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  Observable,
  of,
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
import { FileDnd } from '../../../../../shared/ui-kit/drag-and-drop/interfaces/drop-box.interface';
import { DocumentReq } from '../../../requests/interfaces/request.interface';
import { downloadBase64File, extractBase64 } from '../../../../../shared/services/tools.service';
import { GetAgentRequestService } from '../../../../../public/service/get-agent-request.service';
import { AutoUnsubscribeService } from '../../../../../shared/services/auto-unsubscribe.service';
import { AgentDataInterface, AgentSuggestionsInterface } from '../../../../../public/type/agent.interface';
import { OrganizationDataInterface } from '../../../../../shared/types/organization/organization-data.interface';
import { DemandDebtorDrawerStaticService, IForm } from './demand-debtor-drawer-static.service';
import { DemandsPrepareEnum } from '../../pages/demand-new-home/demand-new-home.component';
import { DemandInterface } from '../../types/demand.interface';
import { DemandDrawerService } from '../demand-drawer/demand-drawer.service';
import { Properties } from 'csstype';
import { FileMode } from '../../../../../shared/types/file/file-model.interface';

@Component({
  selector: 'mib-demand-debtor-drawer',
  templateUrl: './demand-debtor-drawer.component.html',
  styleUrls: ['./demand-debtor-drawer.component.scss'],
  providers: [DestroyService]
})
export class DemandDebtorDrawerComponent implements OnInit {
  isSubmitting$ = new BehaviorSubject<boolean>(false);
  loading$ = new BehaviorSubject<boolean>(false);
  orgData: AgentSuggestionsInterface;
  dataByINN = [];
  form: FormGroup;

  private titleInfo: { create: Date; update: Date; status: any };
  private viewChange = false;
  tabIndex = '1';
  viewingData: DemandInterface<{ Subject: string; Question: string; Files: [] }>;
  messageForm: FormGroup;
  skeleton: Properties = {
    borderRadius: '8px',
    height: '95px',
    width: '100%'
  };

  get date(): { create: Date, update: Date, status: string } {
    return this.titleInfo;
  }

  constructor(
    private demandDrawerService: DemandDrawerService,
    public dialogRef: MatDialogRef<DemandDebtorDrawerComponent>,
    private getAgentRequestService: GetAgentRequestService,
    private demandService: DemandService,
    private requestFailureModalService: RequestFailureModalService,
    private requestCreateSuccessModalService: RequestCreateSuccessModalService,
    private demandDebtorDrawerStaticService: DemandDebtorDrawerStaticService,
    private destroy$: DestroyService,
    private fb: FormBuilder,
    private au: AutoUnsubscribeService,
    @Inject(MAT_DIALOG_DATA) public data: DrawerData
  ) {
  }

  identify(index, item) {
    return item.DemandMessageID;
  }

  private initMessageForm() {
    this.messageForm = this.fb.group({
      FileCode: [''],
      Comment: ['', Validators.required]
    });
  }

  ngOnInit() {
    const modalData = this.data.data;
    this.initForm();

    // Если редактирование ИЛИ просмотр, тогда тянем данные с АПИ
    if (modalData?.isEdit || modalData?.isView) {
      this.getByID(modalData.id, modalData.isEdit);
      this.initMessageForm();
      if (modalData.isEdit) this.getDemandByID(modalData.id);
    }

    // Если создание и нет черновика
    if (modalData?.isCreation && !modalData?.id) {
      // инициализируем черновик
      this.initDraft();
      // Запрашиваем метод prepare для предзаполнения инпутов
      this.prepareDemandByTypes(modalData.prepareTypeId);
    }

    // Если создание и есть черновик
    if (modalData?.isCreation || modalData?.isEdit) {
      // Включаем авто сохранение первого/второго таба
      this.enableAutoSaveDraft();
    }
  }

  private initForm() {
    // {
    //   ID: "",
    //   Title: "",
    //   INN: "",
    //   IsNew: false,
    //   Type: "NewDebtor",
    //   Files: []
    // }
    const form: IForm<OrganizationDataInterface> = this.demandDebtorDrawerStaticService.form;
    this.form = this.fb.group(form);
    this.getDataByINN();
  }

  private prepareDemandByTypes(type: DemandsPrepareEnum) {
    this.loading$.next(true);
    this.demandService.prepareDemandByTypes(type)
      .pipe(
        finalize(() => this.loading$.next(false))
      )
      .subscribe(res => {
          console.log('prepareDemandByTypes=>', res);
          this.patchData(res);
        }
      );
  }

  private patchData(data: any) {
    this.form.patchValue(data);
  }

  getDataByINN() {
    this.form.get('INN')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.getAgentRequestService.getAgentData(value)),
      takeUntil(this.au.destroyer)
    ).subscribe(options => {
      this.dataByINN = options.suggestions || [];
      this.orgData = this.dataByINN.find((option) => this.form.get('INN').value === option?.data?.inn);
      if (this.orgData?.data) {
        this.setDataToOrgForm();
      }
    });
  }

  private getByID(id: number, isDraft: boolean): void {
    this.loading$.next(true);
    const req$ = isDraft ?
      this.demandService
        .getDemandDraftById(id) : this.demandService.getDemandById(id);
    req$.pipe(
      tap(res => {
        this.loading$.next(false);
        const data = isDraft ? res.DemandData : res.Data;
        //this.formDataForChangeOnView = res.Data
        if (this.isView) {
          // this.readFiles = res?.Files?.map(file => ({FileName: file.FileName, Size: file.Size}))
          this.viewingData = res;
          // this.fileTypeConversion(res?.Files)
        }
        if (!isDraft) {
          this.titleInfo = {
            create: res.DateCreated,
            update: res.DateModify,
            status: this.demandService.getStatus(res.Status)
          };
        } else {
          //this.nextPage()
          this.patchData(data);

          const files = data?.Files || [];

          for (let file of files) {
            this.addDocument(file);
          }

        }


      }),
      finalize(() => this.loading$.next(false))
    )
      .subscribe();
  }

  setDataToOrgForm() {
    const data: AgentDataInterface = this.orgData?.data;
    if (!data) return;
    this.form.patchValue({
      Type: data.opf?.short,
      ShortTitle: data.name?.short_with_opf,
      FullTitle: data.name?.full,
      KPP: data.kpp,
      OGRN: data.ogrn,
      OKPO: data.okpo,
      Phone: data.phones?.length ? data.phones[0].value : this.form.get('Phone').value,
      Email: data.emails?.length ? data.emails[0].value : this.form.get('Email').value,
      LegalAddress: data.address?.value,
      FactAddress: data.address?.value
    });
  }

  set requestId(val: number) {
    this.data.data.id = val;
  }

  get requestId(): number {
    return this.data.data.id;
  }

  get documents(): FormArray<any> {
    return this.form.get('Files') as FormArray;
  }

  get isView(): boolean {
    return this.data.data.isView;
  }

  get isChangeByView(): boolean {
    return this.isView && !this.viewChange;
  }

  get isEdit(): boolean {
    return this.data.data.isEdit;
  }

  deleteDocument(i: number) {
    const { DemandFileID } = this.documents.at(i).getRawValue() as FileMode;

    this.demandService.deleteDemandFileById(DemandFileID).pipe(
      tap(() => {
        this.documents.removeAt(i);
      })
    ).subscribe();
  }


  private openRequestFailureModal(d): void {
    this.requestFailureModalService.open(d);
  }

  private openRequestSuccessModal(): void {
    this.requestCreateSuccessModalService.open();
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

  addDocument(data: FileMode) {
    this.documents.push(this.createDocumentControl(data));
  }

  shiftDocumentControlByType(data: FileMode) {
    this.documents.insert(0, this.createDocumentControl(data));
  }

  uploadDocumentToDraft(req: DocumentReq): Observable<FileMode> {

    return this.demandService.uploadDraftFile(req.File, 'test', this.requestId).pipe(
      catchError((err, caught) => {
        console.error(`Ошибка загрузки файла ${req.Title}:`, err);
        return of(err);
      })
    );
  }

  onDocumentLoad({ file, url }: FileDnd) {
    this.uploadDocumentToDraft({
      Description: `description ${file.name}`,
      DocumentTypeID: 40, // TODO: Узнать, статичен ли тип файла. Найти енам с "ключ/значение"
      Title: file.name,
      OwnerTypeID: 20, // TODO: Скорее всего, нужно тянуть id из объекта пользователя
      Data: extractBase64(url),
      File: file
    }).pipe(
      tap(doc => {
        this.shiftDocumentControlByType(doc);
      })
    ).subscribe();
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

  private getDemandByID(id: number): void {
    this.demandService.getDemandDraftById(id).pipe(takeUntil(this.destroy$)).subscribe({
      next: val => {
        // const demandData = JSON.parse()
        this.form.patchValue({});
      }
    });
  }

  private onSaveDraftSuccess(result: any): void {
    console.log('Черновик и файлы успешно сохранены:', result);
  }

  private onSaveDraftError(error: any): void {
    console.error('Ошибка при сохранении черновика или файлов:', error);
  }

  private hasFormChanged(prev: any, curr: any): boolean {
    return JSON.stringify(prev) !== JSON.stringify(curr);
  }

  private saveDraft(): Observable<any> {
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

  private initDraft(): void {
    const payload = this.createDraftPayload();
    this.demandService.createNewDraft(payload)
      .pipe(
        tap(id => {
          this.requestId = id;
        })
      )
      .subscribe();
  }

  private createDraftPayload(): any {
    const inn = this.form.get('INN').value;
    return {
      ...this.form.getRawValue(),
      INN: inn,
      IsNew: false,
      Type: 'NewDebtor'
    };
  }

  private enableAutoSaveDraft(): void {
    this.form?.valueChanges
      .pipe(
        filter(() => !!this.requestId), // Предпочтительно использовать requestId напрямую
        debounceTime(500), // Ждем 500 мс после окончания ввода
        distinctUntilChanged(), // Запрос будет отправлен только если данные изменились
        startWith(this.form.value), // Начальное значение формы
        pairwise(), // Получаем текущее и предыдущее значения формы
        filter(([prev, curr]) => this.hasFormChanged(prev, curr)), // Проверка изменений формы
        switchMap(() => this.saveDraft()) // Сохранение черновика
      )
      .subscribe({
        next: result => this.onSaveDraftSuccess(result), // Успешная обработка черновика
        error: error => this.onSaveDraftError(error) // Обработка ошибок
      });
  }

  private resetMessageModal() {
    this.initMessageForm();
    this.demandDrawerService.updateDocumentsState(undefined);
  }

  sendMessage() {
    this.isSubmitting$.next(true);
    this.demandService.sendDemandsMessage(this.messageForm.value, this.data.data.id)
      .subscribe({
        complete: () => {
          const modalData = this.data.data;
          this.getByID(modalData.id, modalData.isEdit);
          this.resetMessageModal();
          this.isSubmitting$.next(false);
        },
        error: () => {
          this.dialogRef.close();
          this.openRequestFailureModal(this.requestId);
        }
      });
  }

  deleteFile() {
    const modalData = this.data.data;
    this.getByID(modalData.id, modalData.isEdit);
  }
}
