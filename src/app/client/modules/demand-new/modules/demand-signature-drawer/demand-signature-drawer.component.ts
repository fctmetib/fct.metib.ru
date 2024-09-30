import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {BehaviorSubject, debounceTime, distinctUntilChanged, switchMap, takeUntil, tap} from 'rxjs'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'
import {GetAgentRequestService} from '../../../../../public/service/get-agent-request.service'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {AutoUnsubscribeService} from '../../../../../shared/services/auto-unsubscribe.service'

@Component({
  selector: 'mib-demand-signature-drawer',
  templateUrl: './demand-signature-drawer.component.html',
  styleUrls: ['./demand-signature-drawer.component.scss']
})
export class DemandSignatureDrawerComponent implements OnInit {
  public progress$ = new BehaviorSubject<number>(1)
  public progress: number = 1
  public maxPage: number = 4
  public pageCount: number = 1
  public dataByINN = []
  public orgDataForm: FormGroup
  public personalDataForm: FormGroup
  public filesForm: FormGroup

  constructor(
    public dialogRef: MatDialogRef<DemandSignatureDrawerComponent>,
    private toaster: ToasterService,
    private getAgentRequestService: GetAgentRequestService,
    private fb: FormBuilder,
    private au: AutoUnsubscribeService,
    @Inject(MAT_DIALOG_DATA) public data: DrawerData
  ) {
    console.log(data.data.id)
  }

  ngOnInit() {
    this.initOrgDataForm()
    this.initPersonalDataForm()
  }

  public initOrgDataForm() {
    this.orgDataForm = this.fb.group({
      organizationInn: [null, Validators.required],
      organizationType: null,
      organizationForm: null,
      shortNameOrg: null,
      fullNameOrg: null,
      orgInn: null,
      orgKpp: null,
      orgOgrn: null,
      orgOkpo: null,
      orgPhone: null,
      orgMail: null,
      orgLegalAddress: null,
      legalMatchesReal: false,
      realAddress: null,
      personInn: null
    })

    this.getDataByINN()
  }

  public initPersonalDataForm() {
    this.personalDataForm = this.fb.group({
      surname: null,
      name: null,
      secondName: null,
      male: false,
      female: false,
      inn: null,
      snils: null,
      birthday: null,
      bornPlace: null,
      role: null,
      phone: null,
      mail: null,
      nationality: null,
      series: null,
      number: null,
      dateGave: null,
      code: null,
      whoGave: null
    })
  }

  public getDataByINN() {
    this.orgDataForm.get('organizationInn')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.getAgentRequestService.getAgentData(value)),
      takeUntil(this.au.destroyer)
    ).subscribe(options => {
      console.log(options.suggestions)
      this.dataByINN = options.suggestions || []
    })
  }

  public nextPage() {
    if (this.pageCount >= 1 && this.pageCount <= this.maxPage - 1) {
      this.progress = this.progress$.value + 1
      this.progress$.next(this.progress)
      this.pageCount = this.progress
      console.log('next', this.progress)
    } else {
      return
    }
  }

  public prevPage() {
    if (this.pageCount >= 2 && this.pageCount <= this.maxPage) {
      this.progress = this.progress$.value - 1
      this.progress$.next(this.progress)
      this.pageCount = this.progress
      console.log('prev', this.progress)
    } else {
      return
    }
  }

  public submitData() {
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

  public formIsValid(): boolean {
    switch (this.progress) {
      case 1:
        return this.orgDataForm.get('organizationInn')?.value
      case 2:
        return this.orgDataForm?.valid
      case 3:
        return this.personalDataForm?.valid
      case 4:
        return this.filesForm?.valid
      default:
        return false
    }
  }
}
