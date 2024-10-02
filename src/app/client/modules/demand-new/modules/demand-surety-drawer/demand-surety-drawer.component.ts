import {AfterContentInit, AfterViewInit, Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {BehaviorSubject, debounceTime, distinctUntilChanged, filter, switchMap} from 'rxjs'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'
import {ContractedFormsEnum} from 'src/app/shared/ui-kit/contracted-forms/interfaces/contracted-forms.interface'
import {FileDnd} from 'src/app/shared/ui-kit/drag-and-drop/interfaces/drop-box.interface'
import {DocumentReq} from '../../../requests/interfaces/request.interface'
import {extractBase64} from 'src/app/shared/services/tools.service'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {DestroyService} from '../../../../../shared/services/common/destroy.service'
import {DemandService} from '../../services/demand.service'
import {takeUntil} from 'rxjs/operators'
import {GetAgentRequestService} from '../../../../../public/service/get-agent-request.service'
import {AgentDataInterface, AgentSuggestionsInterface, BankInfo} from '../../../../../public/type/agent.interface'

@Component({
  selector: 'mib-demand-surety-drawer',
  templateUrl: './demand-surety-drawer.component.html',
  styleUrls: ['./demand-surety-drawer.component.scss'],
  providers: [DestroyService]
})
export class DemandSuretyDrawerComponent implements OnInit {
  progres$ = new BehaviorSubject<number>(1)
  progress: number = 1
  maxPage: number = 5
  pageCount: number = 1
  fourthPageForm: FormGroup
  ContractedFormsEnum = ContractedFormsEnum
  requisites: string = ''
  orgData: AgentSuggestionsInterface
  dataByINN = []
  bankDataByName = []
  bankData: BankInfo
  orgDataForm: FormGroup
  bankForm: FormGroup

  constructor(
    private toaster: ToasterService,
    private demandSrv: DemandService,
    private destroy$: DestroyService,
    private getAgentRequestSrv: GetAgentRequestService,
    public dialogRef: MatDialogRef<DemandSuretyDrawerComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: DrawerData
  ) {
    const info = data?.data
    // {
    //   "isCreation": true,
    //   "isEdit": false,
    //   "isView": false,
    //   "id": null
    // }[Validators.required, Validators.pattern(/^[\d]+$/)]

    if (info?.isEdit) {
      this.getDemandById((info.id)).pipe(takeUntil(this.destroy$)).subscribe({
        next: res => {

        }
      })
    }
  }

  ngOnInit(): void {
    this.initOrgDataForm()
    this.initBankForm()
  }

  initOrgDataForm(): void {
    this.orgDataForm = this.fb.group({
      INN: [null, [Validators.required, Validators.pattern(/^[0-9]{10,12}$/)]],
      Type: null,
      ShortTitle: null,
      Phone: null,
      Email: null,
      Url: null
    })

    this.getDataByINN()
  }

  initBankForm(): void {
    this.bankForm = this.fb.group({
      Bank: null,
      Bik: null,
      KorrespondentAccount: null,
      Bill: null,
      RegistrationDate: null,
      Comment: null
    })

    this.getBankData()
  }

  getBankData(): void {
    this.bankForm.get('Bank').valueChanges.pipe(
      filter(() => this.pageCount === 3),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.getAgentRequestSrv.getBankData(value)),
      takeUntil(this.destroy$)).subscribe({
      next: val => {
        this.bankDataByName = val
        this.bankData = this.bankDataByName.find((el) => this.bankForm.get('Bank').value === el.value)
        this.setDataToBankForm()
      }
    })
  }

  getDataByINN(): void {
    this.orgDataForm.get('INN')?.valueChanges.pipe(
      filter(() => this.pageCount === 1),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.getAgentRequestSrv.getAgentData(value)),
      takeUntil(this.destroy$)
    ).subscribe(options => {
      this.dataByINN = options.suggestions || []
      this.orgData = this.dataByINN.find((option) => this.orgDataForm.get('INN').value === option?.data?.inn)
    })
  }

  onDocumentLoad({file, url}: FileDnd): void {
    const document: DocumentReq = {
      Description: `description ${file.name}`,
      DocumentTypeID: 40,
      Title: file.name,
      OwnerTypeID: 20,
      Data: extractBase64(url)
    }
    // this.addDocument(document)
  }

  nextPage(): void {
    if (this.pageCount >= 1 && this.pageCount <= this.maxPage - 1) {
      this.progress = this.progres$.value + 1
      this.progres$.next(this.progress)
      this.pageCount = this.progress
      if (this.pageCount === 4) {

        this.initFourthForm();
      }
      console.log('next', this.progress)
    }
  }

  prevPage(): void {
    if (this.pageCount >= 2 && this.pageCount <= this.maxPage) {
      this.progress = this.progres$.value - 1
      this.progres$.next(this.progress)
      this.pageCount = this.progress
      console.log('prev', this.progress)
    }
  }

  submitData(): void {
    this.toaster.show(
      'failure',
      'Функционал в разработке!',
      '',
      true,
      false,
      3000
    )
    // this.dialogRef.close()
  }

  confirmIds(): void {
    this.toaster.show(
      'failure',
      'Функционал в разработке!',
      '',
      true,
      false,
      3000
    )
  }

  addAccount(): void {
    this.toaster.show(
      'failure',
      'Функционал в разработке!',
      '',
      true,
      false,
      3000
    )
  }

  accountEdit(): void {
    this.toaster.show(
      'failure',
      'Функционал в разработке!',
      '',
      true,
      false,
      3000
    )
  }

  saveAccountData(): void {
    this.toaster.show(
      'failure',
      'Функционал в разработке!',
      '',
      true,
      false,
      3000
    )
  }

  canselAccountData(): void {
    this.toaster.show(
      'failure',
      'Функционал в разработке!',
      '',
      true,
      false,
      3000
    )
  }

  saveRealtyData(): void {
    this.toaster.show(
      'failure',
      'Функционал в разработке!',
      '',
      true,
      false,
      3000
    )
  }

  canselRealtyData(): void {
    this.toaster.show(
      'failure',
      'Функционал в разработке!',
      '',
      true,
      false,
      3000
    )
  }

  addRealty(): void {
    this.toaster.show(
      'failure',
      'Функционал в разработке!',
      '',
      true,
      false,
      3000
    )
  }

  saveDebentures(): void {
    this.toaster.show(
      'failure',
      'Функционал в разработке!',
      '',
      true,
      false,
      3000
    )
  }

  cancelDebentures(): void {
    this.toaster.show(
      'failure',
      'Функционал в разработке!',
      '',
      true,
      false,
      3000
    )
  }

  addDebentures(): void {
    this.toaster.show(
      'failure',
      'Функционал в разработке!',
      '',
      true,
      false,
      3000
    )
  }

  addEdms() {
    this.toaster.show(
      'failure',
      'Функционал в разработке!',
      '',
      true,
      false,
      3000
    )
  }

  cancelEdms(): void {
    this.toaster.show(
      'failure',
      'Функционал в разработке!',
      '',
      true,
      false,
      3000
    )
  }

  saveEdms(): void {
    this.toaster.show(
      'failure',
      'Функционал в разработке!',
      '',
      true,
      false,
      3000
    )
  }

  setDataToBankForm() {
    if (this.bankData?.data) {
      const data = this.bankData.data
      this.bankForm.patchValue({
        Bik: data.bic,
        KorrespondentAccount: data.correspondent_account
      })
    }
  }


  setDataToOrgForm(): void {
    if (this.orgData.data) {
      const data = this.orgData.data
      this.orgDataForm.patchValue({
        Type: data.type,
        ShortTitle: data.name?.short,
        Phone: data.phones?.length ? data.phones[0].value : null,
        Email: data.emails?.length ? data.emails[0].value : null,
        Url: null
      })
      this.nextPage()
    }

  }

  private initFourthForm(): void {
    this.fourthPageForm = this.fb.group({
      typeProducts: [null],
      trademarks: [null],
      suppliers: [null],
      limit: [null],
      countEmpl: [null],
      fullAddress: [null],
      creditor: [null],
      contractAmount: [null],
      commitmentType: [null],
      dateEnd: [null],
      balanceEnd: [null],
      balanceToday: [null]
    })
  }

  private getDemandById(id: number) {
    return this.demandSrv.getDemandDraftById(id)
  }
}
