import {Component, Inject, OnInit} from '@angular/core'
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {ButtonSize} from 'src/app/shared/ui-kit/button/interfaces/button.interface'
import {InputSize} from 'src/app/shared/ui-kit/input/interfaces/input.interface'
import {DrawerData} from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface'
import {FileDnd} from 'src/app/shared/ui-kit/drag-and-drop/interfaces/drop-box.interface'
import {extractBase64} from 'src/app/shared/services/tools.service'
import {DocumentReq} from '../../../requests/interfaces/request.interface'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'
import {
	BehaviorSubject,
	catchError,
	debounceTime,
	distinctUntilChanged,
	filter,
	forkJoin,
	of,
	pairwise,
	startWith,
	switchMap,
	tap
} from 'rxjs'
import {DemandService} from '../../services/demand.service'

@Component({
	selector: 'mib-demand-drawer',
	templateUrl: './demand-drawer.component.html',
	styleUrls: ['./demand-drawer.component.scss']
})
export class DemandDrawerComponent implements OnInit {
	public form: FormGroup

	public isSubmitting$ = new BehaviorSubject<boolean>(false)
	public loading$ = new BehaviorSubject<boolean>(false)

	public nextID: number = 0

	public size: InputSize | ButtonSize = 'm'

	freeRequestType = 'Question'
	initialData: any = null
	isDraft: boolean = false
	isViewDemand: boolean = false
	isDemandRequest: boolean = false

	DraftId = null

	constructor(
		private fb: FormBuilder,
		private toaster: ToasterService,
		private demandService: DemandService,
		public dialogRef: MatDialogRef<DemandDrawerComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DrawerData
	) {}

	get documents() {
		return this.form.get('Documents') as FormArray
	}

	ngOnInit(): void {
		this.initForms()

		const modalData = this.data.data

		// Если редактирование ИЛИ просмотр, тогда тянем данные с АПИ
		if (modalData.isEdit || modalData.isView) {
			this.getByID()
		}

		// Если создание и нет черновика
		if (modalData.isCreation && !modalData.DraftId) {
			// инициализируем черновик
			this.initDraft()

			// Включаем авто сохранение
			this.enableAutoSaveDraft()
		}

		// Если создание и есть черновик
		if (modalData.isCreation && modalData.DraftId) {
			this.DraftId = modalData.DraftId
			// получаем черновик по DraftId
			// this.getCurrentDraft();

			// Включаем авто сохранение
			this.enableAutoSaveDraft()
		}
	}

	getByID() {
		this.demandService
			.getDemandDraftById(1593)
			.pipe(
				tap(data => {
					console.log('getByIDdata :>> ', data)
				})
			)
			.subscribe()
	}

	enableAutoSaveDraft() {
		this.form.valueChanges
			.pipe(
				filter(() => !!this.DraftId),
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
					return this.demandService.updateDraft(this.DraftId, payload)
				})
			)
			.subscribe(result => {
				// Обрабатываем результат запроса
				console.log('Результат API:', result)
			})
	}

	initDraft() {
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
					this.DraftId = id
				})
			)
			.subscribe()
	}

	initForms() {
		this.form = this.fb.group({
			requestTitle: [null, [Validators.required]],
			requestText: [null, [Validators.required]],
			Documents: this.fb.array([])
		})
	}

	addDocument(data: DocumentReq) {
		const control: FormGroup = this.fb.group({
			Number: [null],
			Title: [null],
			Description: [null],
			DocumentTypeID: [null],
			OwnerTypeID: [null],
			Data: [null],
			File: [null],
		})
		control.patchValue(data)
		this.documents.push(control)
	}

	removeDocument(idx: number) {
		this.documents.removeAt(idx)
	}

	onDocumentLoad({file, url}: FileDnd) {
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

	onSubmit() {
		const res = this.form.getRawValue()
		const resObj = {
			DraftId: this.DraftId.toString(),
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

							return this.demandService.uploadFile(
								file,
								"test",
								createdDemandID
							)
						}
					)

					// Ожидание завершения всех запросов на загрузку файлов
					return forkJoin(uploadObservables)
				}),
				catchError(error => {
					console.error('An error occurred >>>:', error)
					return of(null)
				}),
				tap(result => {
					console.log('Second request successful:', result)
					this.dialogRef.close()
				})
			)
			.subscribe()
	}

	public editDocument() {
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
