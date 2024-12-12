import { Component, ElementRef, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {ButtonSize} from 'src/app/shared/ui-kit/button/interfaces/button.interface'
import {InputSize} from 'src/app/shared/ui-kit/input/interfaces/input.interface'
import {DrawerData} from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface'
import {FileDnd} from 'src/app/shared/ui-kit/drag-and-drop/interfaces/drop-box.interface'
import {extractBase64} from 'src/app/shared/services/tools.service'
import {DocumentReq} from '../../../requests/interfaces/request.interface'
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  forkJoin,
  Observable,
  of,
  pairwise,
  startWith,
  switchMap,
  tap,
  throwError
} from 'rxjs'
import {DemandService} from '../../services/demand.service'
import {
  RequestFailureModalService
} from 'src/app/shared/modules/modals/request-failure-modal/request-failure-modal.service'
import {
  RequestCreateSuccessModalService
} from 'src/app/shared/modules/modals/request-create-success-modal/request-create-success-modal.service'
import {DocumentsService} from '../../../documents/services/documents.service'
import { DemandInterface } from '../../types/demand.interface';
import { FileReadOptions } from './interfaces/demand-drawer.interface';
import { DemandDrawerService } from './demand-drawer.service';
import { Properties } from 'csstype';

@Component({
  selector: 'mib-demand-drawer',
  templateUrl: './demand-drawer.component.html',
  styleUrls: ['./demand-drawer.component.scss']
})
export class DemandDrawerComponent implements OnInit {
  @ViewChildren('messagesContent') messagesContent: QueryList<ElementRef>
  form: FormGroup
  messageForm: FormGroup
  isSubmitting$ = new BehaviorSubject<boolean>(false)
  loading$ = new BehaviorSubject<boolean>(false)
  size: InputSize | ButtonSize = 'm'
  freeRequestType = 'Question'
  private titleInfo = {create: null, update: null, status: null}
  private viewChange = false
  private formDataForChangeOnView = null
  public tabIndex = '1'
  public viewingData: DemandInterface<{ Subject: string; Question: string; Files: [] }>
  public readFiles: FileReadOptions[]

  private uploadedFiles: Set<string> = new Set();

  constructor(
    private fb: FormBuilder,
    private demandService: DemandService,
    private demandDrawerService: DemandDrawerService,
    private requestFailureModalService: RequestFailureModalService,
    private requestCreateSuccessModalService: RequestCreateSuccessModalService,
    public dialogRef: MatDialogRef<DemandDrawerComponent>,
    private documentsService: DocumentsService,
    @Inject(MAT_DIALOG_DATA) public data: DrawerData
  ) {
  }

  get requestId(): number {
    return this.data.data.id
  }

  set requestId(val: number) {
    this.data.data.id = val
  }

  get documents(): FormArray<any> {
    return this.form.get('Documents') as FormArray
  }

  get date(): {create: string, update: string, status: string} {
    return this.titleInfo
  }

  get isView(): boolean {
    return this.data.data.isView
  }

  get isChangeByView(): boolean {
    return this.isView && !this.viewChange
  }

  ngOnInit(): void {
    const modalData = this.data.data
    if (modalData?.isEdit || modalData?.isCreation) this.initForms()
    // Если редактирование ИЛИ просмотр, тогда тянем данные с АПИ
    if (modalData?.isEdit || modalData?.isView) {
      this.getByID(modalData.id, modalData.isEdit)
      this.initMessageForm()
      if (modalData?.isEdit) this.enableAutoSaveDraft()
    }

    // Если создание и нет черновика
    if (modalData?.isCreation && !modalData?.id) {
      // инициализируем черновик
      this.initDraft()
      // Включаем авто сохранение
      this.enableAutoSaveDraft()
    }

    // Если создание и есть черновик
    if (modalData?.isCreation && modalData?.id) {
      // Включаем авто сохранение
      this.enableAutoSaveDraft()
    }
  }

  onDocumentLoad({file, url}: FileDnd): void {
    const document: DocumentReq = {
      // TODO: ДОБАВИТЬ ИНПУТ С "type='number'" В ФОРМУ
      Number: null,
      Title: file.name,
      Description: `description ${file.name}`,
      DocumentTypeID: 40,
      OwnerTypeID: 6,
      Data: extractBase64(url),
      File: file
    }

    this.addDocument(document)
  }

  public skeleton: Properties = {
    borderRadius: '8px',
    height: '95px',
    width: '100%'
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

  private resetMessageModal() {
    this.initMessageForm()
    this.demandDrawerService.updateDocumentsState(undefined)
  }

  downloadCurrentFile(): void {
    console.log('HALO DOWNLOAD FILE >>>', this.documents)
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

  onSubmit(): void {
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

  editDocument(): void {
    this.viewChange = true
    this.initForms(true)
    this.enableAutoSaveDraft()
  }

  private initMessageForm() {
    this.messageForm = this.fb.group({
      FileCode: [''],
      Comment: ['', Validators.required],
    })
  }

  removeDocument(idx: number): void {
    this.documents.removeAt(idx)
  }

  private addDocument(data: DocumentReq): void {
    const control: FormGroup = this.fb.group({
      Number: [null],
      Title: [null],
      Description: [null],
      DocumentTypeID: [null],
      OwnerTypeID: [null],
      Data: [null],
      File: [null]
    })
    control.patchValue(data)
    this.documents.push(control)
  }

  private enableAutoSaveDraft(): void {
    this.form.valueChanges
      .pipe(
        filter(() => !!this.requestId), // Предпочтительно использовать requestId напрямую
        debounceTime(500), // Ждем 500 мс после окончания ввода
        distinctUntilChanged(), // Запрос будет отправлен только если данные изменились
        startWith(this.form.value), // Начальное значение формы
        pairwise(), // Получаем текущее и предыдущее значения формы
        filter(([prev, curr]) => this.hasFormChanged(prev, curr)), // Проверка изменений формы
        switchMap(([prev, curr]) => this.saveDraft(curr)) // Сохранение черновика
      )
      .subscribe({
        next: result => this.onSaveDraftSuccess(result), // Успешная обработка черновика
        error: error => this.onSaveDraftError(error) // Обработка ошибок
      });
  }

  private hasFormChanged(prev: any, curr: any): boolean {
    return JSON.stringify(prev) !== JSON.stringify(curr);
  }

  private saveDraft(formData: any): Observable<any> {
    const payload = this.createDraftPayload(formData);

    return this.demandService.updateDraft(this.requestId, payload).pipe(
      switchMap((draftResult) => {
        if (!draftResult) {
          return throwError(() => new Error('Ошибка сохранения черновика'));
        }

        return this.uploadDraftFiles();
      })
    );
  }

  private createDraftPayload(formData: any): any {
    return {
      Subject: formData.requestTitle,
      Question: formData.requestText,
      Type: this.freeRequestType
    };
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

  get height() {
    return `55vh`
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
        this.formDataForChangeOnView = res.Data
        if (this.isView) {
          this.readFiles = res?.Files?.map(file => ({FileName: file.FileName, Size: file.Size}))
          this.viewingData = res
          setTimeout(() => {
            this.messagesContent.forEach(message => {
              if ((+message.nativeElement.id) + 1 === res?.Messages?.length) {
                message.nativeElement.scrollIntoView({block: 'center', behavior: 'auto'})
              }
            })
          },0)
        }
        if (!isDraft) {
          this.titleInfo = {create: res.DateCreated, update: res.DateModify, status: this.demandService.getStatus(res.Status)}
        } else {
          this.form.patchValue({
            requestTitle: data?.Subject,
            requestText: data?.Question,
            Documents: data?.Files
          })
        }


      })
    )
      .subscribe()
  }

  deleteFile() {
    const modalData = this.data.data
    this.getByID(modalData.id, modalData.isEdit)
  }

  identify(index, item) {
    return item.DemandMessageID
  }

  private initDraft(): void {
    const payload = {
      Subject: '',
      Question: '',
      Type: this.freeRequestType,
      Files: []
    }

    this.demandService
      .createNewDraft(payload)
      .pipe(
        tap(id => {
          this.requestId = id
        })
      )
      .subscribe()
  }

  private initForms(isEdit = false): void {
    this.form = this.fb.group({
      requestTitle: [isEdit ? this.formDataForChangeOnView?.Subject : null, [Validators.required]],
      requestText: [isEdit ? this.formDataForChangeOnView?.Question : null, [Validators.required]],
      Documents: isEdit ? this.formDataForChangeOnView?.Files : this.fb.array([])
    })
  }

  private openRequestFailureModal(d): void {
    this.requestFailureModalService.open(d)
  }

  private openRequestSuccessModal(): void {
    this.requestCreateSuccessModalService.open()
  }
}
