import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {extractBase64} from 'src/app/shared/services/tools.service'
import {FileDnd} from 'src/app/shared/ui-kit/drag-and-drop/interfaces/drop-box.interface'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {DocumentReq} from '../../../requests/interfaces/request.interface'
import {BehaviorSubject, Observable} from 'rxjs'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'
import {FormBuilder, FormGroup} from '@angular/forms'
import {DemandService} from '../../services/demand.service'
import {DestroyService} from '../../../../../shared/services/common/destroy.service'
import {takeUntil} from 'rxjs/operators'

@Component({
  selector: 'mib-demand-signature-drawer',
  templateUrl: './demand-signature-drawer.component.html',
  styleUrls: ['./demand-signature-drawer.component.scss'],
  providers: [DestroyService]
})
export class DemandSignatureDrawerComponent {
  progres$ = new BehaviorSubject<number>(1)
  progress: number = 1
  maxPage: number = 4
  pageCount: number = 1
  firstPageForm: FormGroup
  secondPageForm: FormGroup
  thirdPageForm: FormGroup

  constructor(
    public dialogRef: MatDialogRef<DemandSignatureDrawerComponent>,
    private toaster: ToasterService,
    private fb: FormBuilder,
    private demandSrv: DemandService,
    private destroy$: DestroyService,
    @Inject(MAT_DIALOG_DATA) public data: DrawerData
  ) {
    console.log(data.data.id)
    const info = data?.data
    this.firstPageForm = this.fb.group({
      organizationType: 1,
      organizationInn: '',
      personInn: ''
    })

    if (info?.isEdit) {
      this.getDemandById((info.id)).pipe(takeUntil(this.destroy$)).subscribe({
        next: res => {

        }
      })
    }
  }

  nextPage(): void {
    if (this.pageCount >= 1 && this.pageCount <= this.maxPage - 1) {
      this.progress = this.progres$.value + 1
      this.progres$.next(this.progress)
      this.pageCount = this.progress
      if (this.pageCount === 2) this.initSecondForm()
      if (this.pageCount === 3) this.initThirdForm()
      console.log('next', this.progress)
    }
  }

  prevPage(): void {
    if (this.pageCount >= 2 && this.pageCount <= this.maxPage) {
      this.progress = this.progres$.value - 1
      this.progres$.next(this.progress)
      this.pageCount = this.progress
    }
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

  submitData() : void{
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

  downloadFile(): void {
    this.toaster.show(
      'failure',
      'Функционал в разработке!',
      '',
      true,
      false,
      3000
    )
  }

  private getDemandById(id: number): Observable<any> {
    return this.demandSrv.getDemandDraftById(id)
  }

  private initSecondForm(): void {
    this.secondPageForm = this.fb.group({
      organizationType: this.firstPageForm.get('organizationType').value,
      organizationInn: '',
      organizationForm: '',
      shortNameOrg: '',
      fullNameOrg: '',
      orgInn: '',
      orgKpp: '',
      orgOgrn: '',
      orgOkpo: '',
      orgPhone: '',
      orgMail: '',
      orgLegalAddress: '',
      legalMatchesReal: false,
      realAddress: '',
      personInn: ''
    })
    this.secondPageForm.get('legalMatchesReal').valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: val => {
        this.secondPageForm.patchValue({
          realAddress: val ? this.secondPageForm.get('orgLegalAddress').value : ''
        })
      }
    })
  }

  private initThirdForm(): void {
    this.thirdPageForm = this.fb.group({
      surname: '',
      name: '',
      secondName: '',
      male: false,
      female: false,
      inn: '',
      snils: '',
      birthday: '',
      bornPlace: '',
      role: '',
      phone: '',
      mail: '',
      nationality: '',
      series: '',
      number:'',
      dateGave:'',
      code:'',
      whoGave:''
    })
  }
}
