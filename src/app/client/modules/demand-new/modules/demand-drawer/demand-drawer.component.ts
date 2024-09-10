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
	of,
	pairwise,
	startWith,
	switchMap,
	tap
} from 'rxjs'
import {DemandService} from '../../services/demand.service'

// export interface demandInterface {
// 	DraftId: 'string'
// 	DemandData: {
// 		Subject: 'string'
// 		Question: 'string'
// 		Type: 'string'
// 		Files: [
// 			{
// 				ID: 0
// 				Identifier: 'string'
// 				Code: 'string'
// 				FileName: 'string'
// 				Size: 0
// 			}
// 		]
// 	}
// }

// export interface freeDemandRequestDrawerInterface {
// 	DraftId: string
// 	DemandData: {
// 		Organization: {
// 			Type: 0
// 			LegalForm: string
// 			FullTitle: string
// 			ShortTitle: string
// 			ForeignTitle: string
// 			Phone: string
// 			Email: string
// 			Website: string
// 			LegalAddress: {
// 				PostCode: string
// 				Country: string
// 				RegionTitle: string
// 				RegionCode: 0
// 				District: string
// 				City: string
// 				Locality: string
// 				Street: string
// 				House: string
// 				Appartment: string
// 			}
// 			PostAddress: {
// 				PostCode: string
// 				Country: string
// 				RegionTitle: string
// 				RegionCode: 0
// 				District: string
// 				City: string
// 				Locality: string
// 				Street: string
// 				House: string
// 				Appartment: string
// 			}
// 			FactAddressEquals: true
// 			PostAddressEquals: true
// 			FactAddress: {
// 				PostCode: string
// 				Country: string
// 				RegionTitle: string
// 				RegionCode: 0
// 				District: string
// 				City: string
// 				Locality: string
// 				Street: string
// 				House: string
// 				Appartment: string
// 			}
// 			Requisites: {
// 				LegalForm: string
// 				INN: string
// 				KPP: string
// 				OGRN: string
// 				OKPO: string
// 				OKATO: string
// 				OKVED: string
// 				OKOGU: string
// 				Signer: {
// 					FIO: string
// 					Position: string
// 					Reason: string
// 				}
// 				AccountManager: string
// 				BankAccount: {
// 					Bank: string
// 					COR: string
// 					BIK: string
// 					Number: string
// 				}
// 				RegistrationDate: Date
// 				SalesManagerID: 0
// 				RegistrationRegionID: 0
// 			}
// 			Settings: {
// 				BorderHour: 0
// 				AgregateUnload: true
// 				FabricPostingType: 0
// 				SystemNameType: 0
// 			}
// 		}
// 		Person: {
// 			NameFirst: string
// 			NameLast: string
// 			NameSecond: string
// 			Gender: 0
// 			Phone: string
// 			Email: string
// 			SNILS: string
// 			INN: string
// 			BirthDate: Date
// 			BirthCountryCode: 0
// 			BirthPlace: string
// 			Address: string
// 		}
// 		Passport: {
// 			Number: string
// 			Date: Date
// 			Expire: Date
// 			IssuerTitle: string
// 			IssuerCode: string
// 			IsForeign: true
// 			Nationality: string
// 		}
// 		PersonPosition: string
// 		PersonalAgreement: true
// 		identificationPointGuid: string
// 		Type: string
// 		Files: [
// 			{
// 				ID: 0
// 				Identifier: string
// 				Code: string
// 				FileName: string
// 				Size: 0
// 			}
// 		]
// 		SkipIsDoneCheck: true
// 	}
// }

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
		this.getByID()

		this.demandService.prepareDemandByTypes(1).subscribe(data => {
			console.log('prepare >>> :>> ', data)
		})

		const currentDraft = null
		const payload = {
			Subject: '',
			Question: '',
			Type: 'Question',
			Files: []
		}
		this.demandService
			.createNewDraft(payload)
			.pipe(
				tap(id => {
					console.log('create autosave id :>> ', id)
				})
			)
			.subscribe()
		this.form.valueChanges
			.pipe(
				debounceTime(300), // Ждем 300 мс после окончания ввода
				distinctUntilChanged(), // Запрос будет отправлен только если данные изменились
				startWith(this.form.value), // Начальное значение формы
				pairwise(), // Получаем текущее и предыдущее значения формы
				filter(([prev, curr]) => JSON.stringify(prev) !== JSON.stringify(curr)) // Выполняем только если данные изменились
				//		switchMap(([prev, curr]) => {
				// Выполняем запрос на API с текущими значениями формы
				//			return this.demandService.changeCurrentDraft() // ============================== АПДЕЙТ ЧЕРНОВИКА
				// return PUT (/api/v1/demands); // ============================== АПДЕЙТ ЧЕРНОВИКА
				//		})
			)
			.subscribe(result => {
				// Обрабатываем результат запроса
				console.log('Результат API:', result)
			})

		this.form.valueChanges.pipe(debounceTime(3000)).subscribe(value => {
			console.log('Form data changed:>>>', value)
			// this.autoSave()
		})
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
		// .pipe(
		// 	catchError(error => {
		// 		console.error('An error AUTOSAVE >>>:', error)
		// 		return of(null)
		// 	}),
		// 	tap(result => {
		// 		// this.toaster.show('success', 'Автосохранение', '', true, false, 1500)
		// 		console.log('AUTOSAVE-RESULT:', result)
		// 	})
		// )
		// .subscribe()
	}

	autoSave() {
		const formData = this.form.getRawValue()

		console.log('AUTOSAVE-init>>>')

		const payload = {
			// Type: this.initialData?.Type || 'Question',
			// Files: [
			// 	{
			// 		ID: 0,
			// 		Identifier: 'string',
			// 		Code: 'string',
			// 		FileName: 'string',
			// 		Size: 0
			// 	}
			// ]
			// DraftId: '',
			// DemandData: {
			// 	Subject: formData.requestTitle,
			// 	Question: formData.requestText,
			// 	Type: this.initialData.Type,
			// 	Files: this.initialData.Files
			// }

			Subject: formData.requestTitle,
			Question: formData.requestText,
			// Type: 1,
			Type: this.freeRequestType,
			Files: []
			// }
		}

		this.demandService
			.changeCurrentDraft(payload)
			.pipe(
				catchError(error => {
					console.error('An error AUTOSAVE >>>:', error)
					return of(null)
				}),
				tap(result => {
					// this.toaster.show('success', 'Автосохранение', '', true, false, 1500)
					console.log('AUTOSAVE-RESULT:', result)
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
			Data: [null]
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
			// Бекенд сказал, что информация берётся из токена
			// OwnerID: this.userFactoring.OrganizationID,
			Data: extractBase64(url)
		}
		this.addDocument(document)
	}

	saveData(): void {
		const formData = this.form.getRawValue()

		const payload = {
			DraftId: '',
			DemandData: {
				Subject: formData.requestTitle,
				Question: formData.requestText,
				Type: this.initialData.Type,
				Files: this.initialData.Files
			}
		}

		console.log('payload :>> ', payload)

		this.demandService
			.createDemand(payload)
			.pipe(
				catchError(error => {
					console.error('An error AUTOSAVE >>>:', error)
					return of(null)
				}),
				tap(result => {
					// this.toaster.show('success', 'Автосохранение', '', true, false, 1500)
					console.log('AUTOSAVE++:', result)
				})
			)
			.subscribe()
	}

	saveDraftAuto() {
		console.log('SAVE DRAFT>>>')
		const formData = this.form.getRawValue()

		const payload = {
			Subject: formData.requestTitle,
			Question: formData.requestText,
			Type: 'Question',
			Files: []
		}

		this.demandService
			.changeCurrentDraft(payload)
			.pipe(
				catchError(error => {
					console.error('An error AUTOSAVE >>>:', error)
					return of(null)
				}),
				tap(result => {
					console.log('payload :>> ', payload)
					// this.toaster.show('success', 'Автосохранение', '', true, false, 1500)
					console.log('AUTOSAVE-RESULT:', result)
				})
			)
			.subscribe()
	}

	onSubmit() {
		console.log('CREATE REQUEST>>>')
		const res = this.form.getRawValue()

		let reqData = {
			Subject: res.requestTitle,
			Question: res.requestText,
			Type: 'Question',
			Files: []
		}

		// let reqData = {
		// 	Title: res.requestTitle,
		// 	Text: res.requestText,
		// 	Document: this.documents
		// }

		console.log('reqData :>> ', reqData)
		this.demandService
			.prepareDemandByTypes(this.freeRequestType)
			.pipe(
				switchMap(result => {
					console.log('result :>> ', result)
					const resObj = {
						DraftId: '',
						DemandData: {
							Subject: reqData.Subject,
							Question: reqData.Question,
							Type: reqData.Type,
							Files: []
						}
					}

					return this.demandService.createDemand(resObj)
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
