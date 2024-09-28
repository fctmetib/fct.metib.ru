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
import {ToasterService} from 'src/app/shared/services/common/toaster.service'
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
  isDownloading$ = new BehaviorSubject<boolean>(false)

  constructor(
    private fb: FormBuilder,
    private toaster: ToasterService,
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

  ngOnInit(): void {
    const modalData = this.data.data
    this.initForms()

    // Если редактирование ИЛИ просмотр, тогда тянем данные с АПИ
    if (modalData?.isEdit || modalData?.isView) {
      this.getByID(modalData.id)
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

  enableAutoSaveDraft(): void {
    this.form.valueChanges
      .pipe(
        filter(() => !!this.data.data.id),
        debounceTime(300), // Ждем 300 мс после окончания ввода
        distinctUntilChanged(), // Запрос будет отправлен только если данные изменились
        startWith(this.form.value), // Начальное значение формы
        pairwise(), // Получаем текущее и предыдущее значения формы
        filter(([prev, curr]) => JSON.stringify(prev) !== JSON.stringify(curr)),
        switchMap(([prev, curr]) => {
          const payload = {
            Subject: curr.requestTitle,
            Question: curr.requestText,
            Type: this.freeRequestType,
            Files: []
          }
          return this.demandService.updateDraft(this.requestId, payload)
        })
      )
      .subscribe(result => {
        // Обрабатываем результат запроса
        console.log('Результат API:', result)
      })
  }

  getByID(id: number) {
    this.demandService
      .getDemandDraftById(id)
      .pipe(
        tap(res => {
          const data = JSON.parse(res.DemandData)
          this.form.patchValue({
            requestTitle: data.Subject,
            requestText: data.Question,
            Documents: data.Files
          })
        })
      )
      .subscribe(
      )
  }

  initDraft(): void {
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
          console.log('create autosave id :>> ', id)
          this.requestId = id
        })
      )
      .subscribe()
  }

  addDocument(data: DocumentReq): void {
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

  removeDocument(idx: number): void {
    this.documents.removeAt(idx)
  }

  initForms() {
    this.form = this.fb.group({
      requestTitle: [null, [Validators.required]],
      requestText: [null, [Validators.required]],
      Documents: this.fb.array([])
    })
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
    // 	.getDocumentContent(this.documents.   DocumentID)
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
        error: () => {
          this.dialogRef.close()
          this.openRequestFailureModal(this.requestId)
        },
        complete: () => {
          this.dialogRef.close()
          this.openRequestSuccessModal()
        }
      })
  }

  openRequestFailureModal(d): void {
    this.requestFailureModalService.open(d)
  }

  openRequestSuccessModal() {
    this.requestCreateSuccessModalService.open()
  }

  openDraftFromModal(): void {
    console.log('HALO FROM MODAL TO OPEN DRAFT >>>>')
  }

  public editDocument(): void {
    this.toaster.show(
      'failure',
      'Функционал в разработке!',
      '',
      true,
      false,
      3000
    )
  }
}
