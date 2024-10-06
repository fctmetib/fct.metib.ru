import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
	BehaviorSubject,
	debounceTime,
	distinctUntilChanged,
	filter,
	Observable,
	switchMap
} from 'rxjs';
import { ToasterService } from 'src/app/shared/services/common/toaster.service';
import { FileDnd } from 'src/app/shared/ui-kit/drag-and-drop/interfaces/drop-box.interface';
import { DocumentReq } from '../../../requests/interfaces/request.interface';
import { extractBase64 } from 'src/app/shared/services/tools.service';
import { DrawerData } from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DestroyService } from '../../../../../shared/services/common/destroy.service';
import { DemandService } from '../../services/demand.service';
import { takeUntil } from 'rxjs/operators';
import { GetAgentRequestService } from '../../../../../public/service/get-agent-request.service';
import { AgentSuggestionsInterface, BankInfo } from '../../../../../public/type/agent.interface';

@Component({
	selector: 'mib-demand-surety-drawer',
	templateUrl: './demand-surety-drawer.component.html',
	styleUrls: ['./demand-surety-drawer.component.scss'],
	providers: [DestroyService]
})
export class DemandSuretyDrawerComponent implements OnInit {
	progress$ = new BehaviorSubject<number>(1);
	progress: number = 1;
	maxPage: number = 5;
	pageCount: number = 1;
	requisites: string = '';
	orgData: AgentSuggestionsInterface | null = null;
	dataByINN = [];
	bankDataByName = [];
	bankData: BankInfo | null = null;
	orgDataForm: FormGroup;
	bankForm: FormGroup;
	mainDataForm: FormGroup;
	form: FormGroup;
	fourthPageForm: FormGroup;

	constructor(
		private toaster: ToasterService,
		private demandSrv: DemandService,
		private destroy$: DestroyService,
		private getAgentRequestSrv: GetAgentRequestService,
		public dialogRef: MatDialogRef<DemandSuretyDrawerComponent>,
		private fb: FormBuilder,
		@Inject(MAT_DIALOG_DATA) private data: DrawerData
	) {}

	ngOnInit(): void {
		this.initForms();
	}

	onDocumentLoad({ file, url }: FileDnd): void {
		const document: DocumentReq = {
			Description: `description ${file.name}`,
			DocumentTypeID: 40,
			Title: file.name,
			OwnerTypeID: 20,
			Data: extractBase64(url)
		};
		// this.addDocument(document)
	}

	nextPage(): void {
		if (this.pageCount >= 1 && this.pageCount < this.maxPage) {
			this.updateProgress(1);
		}
	}

	prevPage(): void {
		if (this.pageCount > 1 && this.pageCount <= this.maxPage) {
			this.updateProgress(-1);
		}
	}

	submitData(): void {
		this.toaster.show('failure', 'Функционал в разработке!', '', true, false, 3000);
		// this.dialogRef.close()
	}

	confirmIds(): void {
		this.toaster.show('failure', 'Функционал в разработке!', '', true, false, 3000);
	}

	addAccount(): void {
		let control = this.form.get('additionalAccountForm') as FormArray;
		control.push(this.createAdditionalAccountForm());
	}

	deleteAccount(idx: number): void {
		let control = this.form.get('additionalAccountForm') as FormArray;
		control.removeAt(idx);
	}

	accountEdit(idx: number): void {
		this.form.get('additionalAccountForm')['controls'][idx].enable();
	}

	saveAccountData(idx: number): void {
		this.form.get('additionalAccountForm')['controls'][idx].disable();
	}

	canselAccountData(idx: number): void {
		const control = this.form.get('additionalAccountForm')['controls'][idx];
		control.enable();
		control.reset();
	}

	saveRealtyData(idx: number): void {
		this.fourthPageForm.get('houses')['controls'][idx].disable();
	}

	canselRealtyData(idx: number): void {
		const control = this.fourthPageForm.get('houses')['controls'][idx];
		control.enable();
		control.reset();
	}

	addRealty(): void {
		let control = this.fourthPageForm.get('houses') as FormArray;
		control.push(
			this.fb.group({
				fullAddress: null,
				owner: true
			})
		);
	}

	saveDebentures(idx: number): void {
		this.fourthPageForm.get('debt')['controls'][idx].disable();
	}

	cancelDebentures(idx: number): void {
		const control = this.fourthPageForm.get('debt')['controls'][idx];
		control.enable();
		control.reset();
	}

	editDebt(idx: number): void {
		this.fourthPageForm.get('debt')['controls'][idx].enable();
	}

	addDebentures(): void {
		let control = this.fourthPageForm.get('debt') as FormArray;
		control.push(
			this.fb.group({
				creditor: null,
				contractAmount: null,
				commitmentType: null,
				dateEnd: null,
				balanceEnd: null,
				balanceToday: null
			})
		);
	}

	deleteDebt(idx: number): void {
		let control = this.fourthPageForm.get('debt') as FormArray;
		control.removeAt(idx);
	}

	addEdms(): void {
		let control = this.fourthPageForm.get('docs') as FormArray;
		control.push(
			this.fb.group({
				debitor: null,
				provider: null
			})
		);
	}

	deleteEdm(idx: number): void {
		let control = this.fourthPageForm.get('docs') as FormArray;
		control.removeAt(idx);
	}

	cancelEdms(idx: number): void {
		const control = this.fourthPageForm.get('docs')['controls'][idx];
		control.enable();
		control.reset();
	}

	saveEdms(idx: number): void {
		this.fourthPageForm.get('docs')['controls'][idx].disable();
	}

	editEdms(idx: number): void {
		this.fourthPageForm.get('docs')['controls'][idx].enable();
	}

	setDataToBankForm(): void {
		if (this.bankData?.data) {
			const data = this.bankData.data;
			this.bankForm.patchValue({
				Bik: data.bic,
				KorrespondentAccount: data.correspondent_account
			});
		}
	}

	setDataToOrgForm(): void {
		if (this.orgData.data) {
			const data = this.orgData.data;
			this.orgDataForm.patchValue({
				Type: data.type,
				ShortTitle: data.name?.short,
				Phone: data.phones?.length ? data.phones[0].value : null,
				Email: data.emails?.length ? data.emails[0].value : null,
				Url: null
			});
			this.nextPage();
		}
	}

	deleteHouse(idx: number): void {
		let control = this.fourthPageForm.get('houses') as FormArray;
		control.removeAt(idx);
	}

	editHouse(idx: number): void {
		this.fourthPageForm.get('houses')['controls'][idx].enable();
	}

	private initForm(): void {
		this.form = this.fb.group({
			additionalAccountForm: this.fb.array([])
		});
		this.form.controls.additionalAccountForm.valueChanges.subscribe(res => console.log(res));
	}

	private initMainDataForm(): void {
		this.mainDataForm = this.fb.group({
			typeProducts: null,
			trademarks: null,
			suppliers: null,
			limit: null,
			countEmpl: null
		});
	}

	private initFourthPageForm(): void {
		this.fourthPageForm = this.fb.group({
			houses: this.fb.array([]),
			debt: this.fb.array([]),
			docs: this.fb.array([])
		});
	}

	private createAdditionalAccountForm(): FormGroup {
		return this.fb.group({
			bank: null,
			bill: null,
			createDate: null,
			closeDate: null,
			reason: null
		});
	}

	private getDemandById(id: number): Observable<any> {
		return this.demandSrv.getDemandDraftById(id);
	}

	private updateProgress(delta: number) {
		this.progress += delta;
		this.progress$.next(this.progress);
		this.pageCount = this.progress;
		console.log(`${delta > 0 ? 'next' : 'prev'} page`, this.progress);
	}

	private initForms(): void {
		this.initOrgDataForm();
		this.initBankForm();
		this.initForm();
		this.initMainDataForm();
		this.initFourthPageForm();

		if (this.data?.data?.isEdit) {
			this.getDemandById(this.data.data.id)
				.pipe(takeUntil(this.destroy$))
				.subscribe({
					next: res => {
						// Обработка данных при редактировании
					}
				});
		}
	}

	private initOrgDataForm(): void {
		this.orgDataForm = this.fb.group({
			INN: [null, [Validators.required, Validators.pattern(/^[0-9]{10,12}$/)]],
			Type: null,
			ShortTitle: null,
			Phone: null,
			Email: null,
			Url: null
		});

		this.orgDataForm
			.get('INN')
			?.valueChanges.pipe(
				filter(() => this.pageCount === 1),
				debounceTime(300),
				distinctUntilChanged(),
				switchMap(value => this.getAgentRequestSrv.getAgentData(value)),
				takeUntil(this.destroy$)
			)
			.subscribe(options => {
				this.dataByINN = options.suggestions || [];
				this.orgData = this.dataByINN.find(
					option => option?.data?.inn === this.orgDataForm.get('INN')?.value
				);
			});
	}

	private initBankForm(): void {
		this.bankForm = this.fb.group({
			Bank: null,
			Bik: null,
			KorrespondentAccount: null,
			Bill: null,
			RegistrationDate: null,
			Comment: null
		});

		this.bankForm
			.get('Bank')
			?.valueChanges.pipe(
				filter(() => this.pageCount === 3),
				debounceTime(300),
				distinctUntilChanged(),
				switchMap(value => this.getAgentRequestSrv.getBankData(value)),
				takeUntil(this.destroy$)
			)
			.subscribe(val => {
				this.bankDataByName = val;
				this.bankData = this.bankDataByName.find(
					el => el.value === this.bankForm.get('Bank')?.value
				);
				this.setDataToBankForm();
			});
	}
}
