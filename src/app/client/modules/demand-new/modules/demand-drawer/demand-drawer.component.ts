import {Component, Inject, OnInit} from '@angular/core'
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {ButtonSize} from 'src/app/shared/ui-kit/button/interfaces/button.interface'
import {InputSize} from 'src/app/shared/ui-kit/input/interfaces/input.interface'
import {DrawerData} from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface'
import {FileDnd} from 'src/app/shared/ui-kit/drag-and-drop/interfaces/drop-box.interface'
import {
  downloadBase64File,
  extractBase64
} from 'src/app/shared/services/tools.service'
import {DocumentReq} from '../../../requests/interfaces/request.interface'
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  forkJoin,
  of,
  pairwise,
  startWith,
  switchMap,
  tap
} from 'rxjs'
import {DemandService} from '../../services/demand.service'
import {
  RequestFailureModalService
} from 'src/app/shared/modules/modals/request-failure-modal/request-failure-modal.service'
import {
  RequestCreateSuccessModalService
} from 'src/app/shared/modules/modals/request-create-success-modal/request-create-success-modal.service'
import {DocumentsService} from '../../../documents/services/documents.service'

@Component({
  selector: 'mib-demand-drawer',
  templateUrl: './demand-drawer.component.html',
  styleUrls: ['./demand-drawer.component.scss']
})
export class DemandDrawerComponent implements OnInit {
  form: FormGroup
  isSubmitting$ = new BehaviorSubject<boolean>(false)
  loading$ = new BehaviorSubject<boolean>(false)
  size: InputSize | ButtonSize = 'm'
  freeRequestType = 'Question'
  private titleInfo = {create: null, update: null, status: null}
  private viewChange = false
  private formDataForChangeOnView = null

  constructor(
    private fb: FormBuilder,
    private demandService: DemandService,
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
    const res = this.form.getRawValue()
    const resObj = {
      DraftId: this.requestId.toString(),
      DemandData: {
        Subject: res.requestTitle,
        Question: res.requestText,
        Type: this.freeRequestType
      }
    }

    this.demandService
      .createDemand(resObj)
      .pipe(
        switchMap(createdDemandID => {
          if (!createdDemandID) {
            throw new Error('Создание запроса не удалось')
          }

          const uploadObservables = this.documents.controls.map(
            (control: FormGroup) => {
              const file = control.get('File').value
              if (file) {
                return this.demandService.uploadFile(
                  file,
                  'test',
                  createdDemandID
                )
              } else {
                return of(null) // Если файл отсутствует, пропускаем загрузку
              }
            }
          )

          // Ожидание завершения всех запросов на загрузку файлов
          return forkJoin(uploadObservables)
        }),
        finalize(() => this.isSubmitting$.next(false))
      )
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
        filter(() => !!this.data.data.id),
        debounceTime(500), // Ждем 300 мс после окончания ввода
        distinctUntilChanged(), // Запрос будет отправлен только если данные изменились
        startWith(this.form.value), // Начальное значение формы
        pairwise(), // Получаем текущее и предыдущее значения формы
        filter(([prev, curr]) => JSON.stringify(prev) !== JSON.stringify(curr)),
        switchMap(([prev, curr]) => {
          const payload = {
            Subject: curr.requestTitle,
            Question: curr.requestText,
            Type: this.freeRequestType,
            Files: this.documents.value
          }
          return this.demandService.updateDraft(this.requestId, payload)
        })
      )
      .subscribe(result => {
        // Обрабатываем результат запроса
        console.log('Результат API:', result)
      })
  }

  private getByID(id: number, isDraft: boolean): void {
    const req$ = isDraft ?
      this.demandService
        .getDemandDraftById(id) : this.demandService.getDemandById(id)
    // {
    //   "Type": "Question",
    //   "Status": "Created",
    //   "User": "Владимир Сновский",
    //   "DateCreated": "2024-10-01T17:18:01+00:00",
    //   "DateModify": "2024-10-01T17:18:01+00:00",
    //   "DateStatus": "2024-10-01T17:18:01+00:00",
    //   "Requirements": [],
    //   "Steps": [],
    //   "Messages": [
    //   {
    //     "Type": "StatusChange",
    //     "Date": "2024-10-01T17:18:01+00:00",
    //     "User": "Владимир Сновский",
    //     "Comment": "Создан новый запрос",
    //     "ID": 73274
    //   }
    // ],
    //   "Files": [],
    //   "Data": {
    //   "Subject": "klklklklk",
    //     "Question": "klklkllkl",
    //     "Type": "Question",
    //     "Files": []
    // },
    //   "ID": 10172
    // }
    req$.pipe(
      tap(res => {
        const data = isDraft ? res.DemandData : res.Data
        this.formDataForChangeOnView = res.Data
        if (!isDraft) {
          this.titleInfo = {create: res.DateCreated, update: res.DateModify, status: this.getStatus(res.Status)}
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

  private getStatus(status: string): string {
    let result: string = ''
    switch (status) {
      case 'Created':
        result = 'Создан'
        break
      case 'Completed':
        result = 'Завершен'
        break
      case 'Processing':
        result = 'В процессе'
        break
      case 'Rejected':
        result = 'Отклонено'
        break
      case 'Draft':
        result = 'Черновик'
        break
      case 'Canceled':
        result = 'Отменен'
        break
    }
    return result
  }
}
