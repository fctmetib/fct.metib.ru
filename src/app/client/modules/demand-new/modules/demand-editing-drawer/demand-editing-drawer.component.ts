import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileDnd } from 'src/app/shared/ui-kit/drag-and-drop/interfaces/drop-box.interface';
import { DocumentReq } from '../../../requests/interfaces/request.interface';
import { downloadBase64File, extractBase64 } from 'src/app/shared/services/tools.service';
import { ToasterService } from 'src/app/shared/services/common/toaster.service';
import { DrawerData } from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandService } from '../../services/demand.service';
import { DestroyService } from '../../../../../shared/services/common/destroy.service';
import { finalize, takeUntil } from 'rxjs/operators';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable, of,
  pairwise,
  startWith,
  switchMap, tap,
  throwError
} from 'rxjs';
import { AutoUnsubscribeService } from '../../../../../shared/services/auto-unsubscribe.service';
import { DemandsPrepareEnum } from '../../pages/demand-new-home/demand-new-home.component';
import {
  RequestFailureModalService
} from '../../../../../shared/modules/modals/request-failure-modal/request-failure-modal.service';
import {
  RequestCreateSuccessModalService
} from '../../../../../shared/modules/modals/request-create-success-modal/request-create-success-modal.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { DemandStatus } from '../../types/demand-status';
import { DemandInterface } from '../../types/demand.interface';
import { Properties } from 'csstype';
import { DemandDrawerService } from '../demand-drawer/demand-drawer.service';
import { FileMode } from '../../../../../shared/types/file/file-model.interface';
import { DataField } from '../../../reports/components/dynamic-data/dynamic-data.component';

export const DemandEditingDataConfig: DataField[] = [
  { label: 'Серия и номер паспорта', key: 'Passport.Number', type: 'text' },
  { label: 'Дата выдачи паспорта', key: 'Passport.Date', type: 'date' },
  { label: 'Срок действия паспорта', key: 'Passport.Expire', type: 'date' },
  { label: 'Кем выдан', key: 'Passport.IssuerTitle', type: 'text' },
  { label: 'Код подразделения', key: 'Passport.IssuerCode', type: 'text' },
  { label: 'Заграничный паспорт', key: 'Passport.IsForeign', type: 'boolean' },
  { label: 'Гражданство', key: 'Passport.Nationality', type: 'text' },
  { label: 'Имя', key: 'Profile.Name.First', type: 'text' },
  { label: 'Фамилия', key: 'Profile.Name.Last', type: 'text' },
  { label: 'Пол (мужской)', key: 'UserProfile.IsMale', type: 'boolean' },
  { label: 'Телефон', key: 'Profile.Phone', type: 'phone' },
  { label: 'Email', key: 'Profile.Email', type: 'text' },
  { label: 'Логин', key: 'Profile.Login', type: 'text' },
  { label: 'Код файла паспорта', key: 'PassportFileCode', type: 'text' }
];

@Component({
  selector: 'mib-demand-editing-drawer',
  templateUrl: './demand-editing-drawer.component.html',
  styleUrls: ['./demand-editing-drawer.component.scss'],
  providers: [DestroyService]
})
export class DemandEditingDrawerComponent implements OnInit {
  public form: FormGroup;
  public countries = [];

  DemandStatus = DemandStatus;
  public status: DemandStatus = DemandStatus.edit;
  public filesWithTypes: any[] = [];
  public viewingData: DemandInterface<any>;

  public loading$ = new BehaviorSubject<boolean>(false);
  public isSubmitting$ = new BehaviorSubject<boolean>(false);

  private titleInfo = { create: null, update: null, status: null };

  public tabIndex = '1';
  public skeleton: Properties = {
    borderRadius: '8px',
    height: '95px',
    width: '100%'
  };
  messageForm: FormGroup;
  DemandEditingDataConfig: DataField[] = DemandEditingDataConfig;

  identify(index, item) {
    return item.DemandMessageID;
  }

  constructor(
    private toaster: ToasterService,
    public dialogRef: MatDialogRef<DemandEditingDrawerComponent>,
    private requestFailureModalService: RequestFailureModalService,
    private requestCreateSuccessModalService: RequestCreateSuccessModalService,
    @Inject(MAT_DIALOG_DATA) public data: DrawerData,
    private fb: FormBuilder,
    private au: AutoUnsubscribeService,
    private demandService: DemandService,
    private destroy$: DestroyService,
    private commonService: CommonService,
    private demandDrawerService: DemandDrawerService
  ) {
  }

  ngOnInit() {
    const modalData = this.data.data;

    this.commonService.getCountries().subscribe(countries => {
      this.countries = countries;
    });

    this.initForm();
    this.initMessageForm();
    this.addSingleChoiceGender();

    if (this.isView) {
      this.form.disable();
    }

    if (modalData?.isView || modalData?.isEdit) {
      console.log('IS VIEW? ', modalData);
      modalData?.isView ? this.status = DemandStatus.view : null;
      this.getByID(modalData?.id, modalData?.isEdit);
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

  public addSingleChoiceGender() {
    this.form.get('UserProfile.Male')?.valueChanges.pipe(
      filter(Boolean),
      takeUntil(this.au.destroyer)
    ).subscribe(() => {
      this.form.get('UserProfile.IsMale').setValue(true);
      this.form.get('UserProfile.Female').setValue(false);
    });

    this.form.get('UserProfile.Female')?.valueChanges.pipe(
      filter(Boolean),
      takeUntil(this.au.destroyer)
    ).subscribe(() => {
      this.form.get('UserProfile.IsMale').setValue(false);
      this.form.get('UserProfile.Male').setValue(false);
    });
  }

  get date(): { create: string, update: string, status: string } {
    return this.titleInfo;
  }

  get isView(): boolean {
    return this.data.data.isView;
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
        this.shiftDocumentControl(doc);
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
    if (this.isView) {
      control.disable();
    }
    control.patchValue(data);
    return control;
  }

  addDocumentControl(data: FileMode) {
    this.documents.push(this.createDocumentControl(data));
  }

  shiftDocumentControl(data: FileMode) {
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

  private initMessageForm() {
    this.messageForm = this.fb.group({
      FileCode: [''],
      Comment: ['', Validators.required]
    });
  }

  private initForm() {
    this.form = this.fb.group({
      UserID: [null],
      Avatar: [null],
      Passport: this.fb.group({
        Number: [null, Validators.required],
        Expire: [null],
        Date: [null, Validators.required],
        IssuerTitle: [null, Validators.required],
        IssuerCode: [null, Validators.required],
        IsForeign: [false],
        Nationality: [null]
      }),
      UserProfile: this.fb.group({
        Name: this.fb.group({
          First: [null, Validators.required],
          Last: [null, Validators.required]
        }),
        IsMale: [null, Validators.required],
        Male: [false],
        Female: [false],
        Phone: [null, Validators.required],
        Email: [null, Validators.required]
      }),
      PassportFileCode: [null],
      Type: ['ProfileChange'],
      Files: this.fb.array([])
    });
    // this.form.valueChanges.pipe(
    //   tap(data => {
    //     console.log(this.form);
    //   })
    // ).subscribe();
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

  get documents(): FormArray<any> {
    return this.form.get('Files') as FormArray;
  }


  deleteDocument(i: number) {
    const { DemandFileID } = this.documents.at(i).getRawValue() as FileMode;

    this.demandService.deleteDemandFileById(DemandFileID).pipe(
      tap(() => {
        this.documents.removeAt(i);
      })
    ).subscribe();
  }


  private getByID(id: number, isDraft: boolean): void {
    this.loading$.next(true);
    const req$ = isDraft ?
      this.demandService
        .getDemandDraftById(id) : this.demandService.getDemandById(id);
    req$.pipe(
      tap(res => {
        const data = isDraft ? res.DemandData : res.Data;
        this.titleInfo = { create: res.DateCreated, update: res.DateModify, status: this.getStatus(res.Status) };

        if (this.isView) {
          this.viewingData = res;
          this.fileTypeConversion(res?.Files);
        }
        console.log('[getByID]: isDraft', isDraft);
        console.log('[getByID]: data', data);
        this.patchData(data);

        const files = data?.Files || res?.Files || [];

        for (let file of files) {
          this.addDocumentControl(file);
        }

      }),
      finalize(() => this.loading$.next(false))
    )
      .subscribe();
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
    if (data.UserProfile) {
      this.form.patchValue({ UserProfile: { Male: data.UserProfile.IsMale, Female: !data.UserProfile.IsMale } });
    }
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
  }

  private initDraft(): void {
    const payload = this.form.value;

    this.demandService.createNewDraft(payload)
      .pipe(
        tap(id => {
          this.requestId = id;
        })
      )
      .subscribe();
  }

  set requestId(val: number) {
    this.data.data.id = val;
  }

  get requestId(): number {
    return this.data.data.id;
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


  private createDraftPayload(): any {
    const userID = this.form.get('UserID').value;
    const passport = this.form.get('Passport').value;
    const profile = this.form.get('UserProfile').value;
    return {
      UserID: userID,
      Avatar: null,
      Passport: {
        Number: passport.Number,
        Date: passport.Date,
        Expire: passport.Expire,
        IssuerTitle: passport.IssuerTitle,
        IssuerCode: passport.IssuerCode,
        IsForeign: passport.IsForeign,
        Nationality: passport.Nationality
      },
      UserProfile: {
        Name: {
          First: profile.Name.First,
          Last: profile.Name.Last
        },
        IsMale: (profile.Male || profile.Female) ? (!!profile.Male) : null,
        Phone: profile.Phone,
        Email: profile.Email,
        Login: null
      },
      PassportFileCode: null,
      Type: 'ProfileChange',
      Files: null
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

  private fileTypeConversion(files: any[]) {
    if (files?.length) {
      const filesWithTypes = {};
      files.forEach(file => {
        const acc = [];
        acc.push(file);
        if (filesWithTypes[file.Identifier]) {
          filesWithTypes[file.Identifier].push(...acc);
        } else {
          filesWithTypes[file.Identifier] = acc;
        }
        this.filesWithTypes.push({
          identifier: file.Identifier,
          files: filesWithTypes[file.Identifier]
        });
      });

      this.filesWithTypes = this.filesWithTypes.filter((obj, idx, arr) =>
        arr.findIndex(t => JSON.stringify(t) === JSON.stringify(obj)) === idx);
    }
  }

  private onSaveDraftSuccess(result: any): void {
    console.log('Черновик и файлы успешно сохранены:', result);
  }

  private onSaveDraftError(error: any): void {
    console.error('Ошибка при сохранении черновика или файлов:', error);
  }

  private getStatus(status: string): string {
    console.log(status);
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

  deleteFile() {
    const modalData = this.data.data;
    this.getByID(modalData.id, modalData.isEdit);
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
}
