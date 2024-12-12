import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface'
import {DemandService} from '../../services/demand.service'
import {DestroyService} from '../../../../../shared/services/common/destroy.service'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {takeUntil} from 'rxjs/operators'
import {
  BehaviorSubject, catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  forkJoin,
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
import { extractBase64 } from '../../../../../shared/services/tools.service';
import { GetAgentRequestService } from '../../../../../public/service/get-agent-request.service';
import { AutoUnsubscribeService } from '../../../../../shared/services/auto-unsubscribe.service';
import { AgentDataInterface, AgentSuggestionsInterface } from '../../../../../public/type/agent.interface';
import { OrganizationDataInterface } from '../../../../../shared/types/organization/organization-data.interface';
import { DemandDebtorDrawerStaticService, IForm } from './demand-debtor-drawer-static.service';
import { DemandsPrepareEnum } from '../../pages/demand-new-home/demand-new-home.component';
import { DemandInterface } from '../../types/demand.interface';
import { DemandDrawerService } from '../demand-drawer/demand-drawer.service';
import { Properties } from 'csstype';

@Component({
  selector: 'mib-demand-debtor-drawer',
  templateUrl: './demand-debtor-drawer.component.html',
  styleUrls: ['./demand-debtor-drawer.component.scss'],
  providers: [DestroyService]
})
export class DemandDebtorDrawerComponent implements OnInit {
  isSubmitting$ = new BehaviorSubject<boolean>(false)
  public loading$ = new BehaviorSubject<boolean>(false)
  public orgData: AgentSuggestionsInterface;
  public dataByINN = []
  form: FormGroup

  private uploadedFiles: Set<string> = new Set();
  private titleInfo: { create: Date; update: Date; status: any };
  private viewChange = false
  public tabIndex = '1'
  public viewingData: DemandInterface<{ Subject: string; Question: string; Files: [] }>
  messageForm: FormGroup
  public skeleton: Properties = {
    borderRadius: '8px',
    height: '95px',
    width: '100%'
  }

  get date(): {create: Date, update: Date, status: string} {
    return this.titleInfo
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
    return item.DemandMessageID
  }

  private initMessageForm() {
    this.messageForm = this.fb.group({
      FileCode: [''],
      Comment: ['', Validators.required],
    })
  }

  ngOnInit() {
    const modalData = this.data.data
    this.initForm()

    // Если редактирование ИЛИ просмотр, тогда тянем данные с АПИ
    if (modalData?.isEdit || modalData?.isView) {
      this.getByID(modalData.id, modalData.isEdit)
      this.initMessageForm()
      if (modalData.isEdit) this.getDemandByID(modalData.id)
    }

    // Если создание и нет черновика
    if (modalData?.isCreation && !modalData?.id) {
      // инициализируем черновик
      this.initDraft()
      // Запрашиваем метод prepare для предзаполнения инпутов
      this.prepareDemandByTypes(modalData.prepareTypeId);
      // Включаем авто сохранение первого/второго таба
      this.enableAutoSaveDraft();
    }

    // Если создание и есть черновик
    if (modalData?.isCreation && modalData?.id) {
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
    const form: IForm<OrganizationDataInterface> = this.demandDebtorDrawerStaticService.form
    this.form = this.fb.group(form)
    this.getDataByINN()
  }

  private prepareDemandByTypes(type: DemandsPrepareEnum) {
    this.demandService.prepareDemandByTypes(type)
      .subscribe(res => {
          console.log('prepareDemandByTypes=>', res);
          this.patchData(res)
        }
      )
  }

  private patchData(data:any) {
    this.form.patchValue(data)
  }

  public getDataByINN() {
    this.form.get('INN')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.getAgentRequestService.getAgentData(value)),
      takeUntil(this.au.destroyer)
    ).subscribe(options => {
      this.dataByINN = options.suggestions || [];
      this.orgData = this.dataByINN.find((option) => this.form.get('INN').value === option?.data?.inn)
      if (this.orgData?.data) {
        this.setDataToOrgForm()
      }
    })
  }

  private getByID(id: number, isDraft: boolean): void {
    this.loading$.next(true)
    const req$ = isDraft ?
      this.demandService
        .getDemandDraftById(id) : this.demandService.getDemandById(id)
    req$.pipe(
      tap(res => {
        this.loading$.next(false)
        const data = isDraft ? res.DemandData : res.Data
        //this.formDataForChangeOnView = res.Data
        if (this.isView) {
          // this.readFiles = res?.Files?.map(file => ({FileName: file.FileName, Size: file.Size}))
          this.viewingData = res
          // this.fileTypeConversion(res?.Files)
        }
        if (!isDraft) {
          this.titleInfo = {create: res.DateCreated, update: res.DateModify, status: this.demandService.getStatus(res.Status)}
        } else {
          //this.nextPage()
          this.patchData(data)
        }


      }),
      finalize(() => this.loading$.next(false))
    )
      .subscribe()
  }

  setDataToOrgForm() {
    const data: AgentDataInterface = this.orgData?.data
    if (!data) return
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
    })
  }

  set requestId(val: number) {
    this.data.data.id = val
  }

  get requestId(): number {
    return this.data.data.id
  }

  get documents(): FormArray<any> {
    return this.form.get('Files') as FormArray
  }

  get isView(): boolean {
    return this.data.data.isView
  }

  get isChangeByView(): boolean {
    return this.isView && !this.viewChange
  }

  get isEdit(): boolean {
    return this.data.data.isEdit
  }

  removeDocument(i: number) {
    this.documents.removeAt(i)
  }

  private openRequestFailureModal(d): void {
    this.requestFailureModalService.open(d)
  }

  private openRequestSuccessModal(): void {
    this.requestCreateSuccessModalService.open()
  }

  onDocumentLoad({file, url}: FileDnd) {
    const document: DocumentReq = {
      Description: `description ${file.name}`,
      DocumentTypeID: 40,
      Title: file.name,
      OwnerTypeID: 20,
      Data: extractBase64(url),
      File: file
    }
    this.addDocument(document)
  }

  private addDocument(doc: DocumentReq) {
    const control: FormGroup = this.fb.group({
      Description: [''],
      DocumentTypeID: [''],
      Title: [''],
      OwnerTypeID: [''],
      Data: [''],
      File: [''],
    })
    control.patchValue(doc)
    this.documents.push(control)
  }

  submitData() {
    this.isSubmitting$.next(true)
    const resObj = {
      draftId: this.requestId,
    }
    this.demandService.createDemand(resObj)
      .subscribe({
        complete: () => {
          this.dialogRef.close()
          this.openRequestSuccessModal()
        },
        error: () => {
          this.dialogRef.close()
          this.openRequestFailureModal(this.requestId)
        }
      })
  }

  downloadCurrentFile(): void {
    console.log('HALO DOWNLOAD FILE >>>', this.form.get('document'))
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

  private getDemandByID(id: number): void {
    this.demandService.getDemandDraftById(id).pipe(takeUntil(this.destroy$)).subscribe({
      next: val => {
        // const demandData = JSON.parse()
        this.form.patchValue({})
      }
    })
  }

  private uploadDraftFiles(): Observable<any> {
    const uploadObservables = this.documents.controls
      .map((control: FormGroup) => {
        const file = control.get('File').value;
        const fileName = file?.name;

        if (file && fileName && !this.uploadedFiles.has(fileName)) {
          return this.demandService.uploadDraftFile(file, 'test', this.requestId).pipe(
            tap(() => this.uploadedFiles.add(fileName)),
            catchError(error => {
              console.error(`Ошибка загрузки файла ${fileName}:`, error);
              return of(null);
            })
          );
        }

        return of(null);
      });

    return forkJoin(uploadObservables.filter(obs => obs !== of(null)));
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
        return this.uploadDraftFiles();
      })
    );
  }

  private initDraft(): void {
    const payload = this.createDraftPayload()
    this.demandService.createNewDraft(payload)
      .pipe(
        tap(id => {
          this.requestId = id
        })
      )
      .subscribe()
  }

  private createDraftPayload(): any {
    const inn = this.form.get('INN').value
    return {
      ...this.form.getRawValue(),
      INN: inn,
      IsNew: false,
      Type: 'NewDebtor'
    }
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
    this.initMessageForm()
    this.demandDrawerService.updateDocumentsState(undefined)
  }

  sendMessage() {
    this.isSubmitting$.next(true)
    this.demandService.sendDemandsMessage(this.messageForm.value, this.data.data.id)
      .subscribe({
        complete: () => {
          const modalData = this.data.data
          this.getByID(modalData.id, modalData.isEdit)
          this.resetMessageModal()
          this.isSubmitting$.next(false)
        },
        error: () => {
          this.dialogRef.close()
          this.openRequestFailureModal(this.requestId)
        }
      })
  }

  deleteFile() {
    const modalData = this.data.data
    this.getByID(modalData.id, modalData.isEdit)
  }
}
