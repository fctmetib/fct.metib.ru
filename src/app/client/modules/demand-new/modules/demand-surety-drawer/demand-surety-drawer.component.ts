import {AfterContentInit, AfterViewInit, Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {BehaviorSubject} from 'rxjs'
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
  firstPageForm: FormGroup
  secondPageForm: FormGroup
  thirdPageForm: FormGroup
  fourthPageForm: FormGroup
  ContractedFormsEnum = ContractedFormsEnum
  requisites: string = ''

  constructor(
    private toaster: ToasterService,
    private demandSrv: DemandService,
    private destroy$: DestroyService,
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
    this.firstPageForm = this.fb.group({
      organizationType: [1, [Validators.required]],
      compInn: [''],
      personInn: ['']
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
      if (this.pageCount === 2) this.initSecondForm()
      if (this.pageCount === 3) this.initThirdForm()
      if (this.pageCount === 4) this.initFourthForm()
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

  private initSecondForm(): void {
    this.secondPageForm = this.fb.group({
      organizationType: [1],
      compInn: [null],
      organizationForm: [null],
      shortName: [null],
      phone: [null],
      mail: [null],
      url: [null],
      personInn: [null],
      shortNamePerson: [null],
      personPhone: [null],
      personMail: [null],
      personUrl: [null]
    })
  }

  private initThirdForm(): void {
    this.thirdPageForm = this.fb.group({
      bank: [null],
      bik: [null],
      coreBankNum: [null],
      bankNum: [null],
      date: [null],
      commmet: [null],
      bank2: [null],
      bankNum2: [null],
      date2: [null],
      closeDate: [null],
      openTarget: [null]
    })
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
