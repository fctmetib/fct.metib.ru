import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {BehaviorSubject, debounceTime, distinctUntilChanged, filter, switchMap, takeUntil} from 'rxjs'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'
import {GetAgentRequestService} from '../../../../../public/service/get-agent-request.service'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {AutoUnsubscribeService} from '../../../../../shared/services/auto-unsubscribe.service'
import {AgentDataInterface, AgentSuggestionsInterface} from '../../../../../public/type/agent.interface'

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
  public orgDataForm: FormGroup;
  public orgData: AgentSuggestionsInterface;
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
      INN: [null, [Validators.required, Validators.pattern(/^[0-9]{10,12}$/)]],
      Type: [null, Validators.required],
      ShortTitle: [null, Validators.required],
      FullTitle: [null, Validators.required],
      KPP: [null, Validators.required],
      OGRN: [null, Validators.required],
      OKPO: [null, Validators.required],
      Phone: [null, [Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)]],
      Email: [null, [Validators.required, Validators.email]],
      LegalAddress: [null, Validators.required],
      FactAddress: [null, Validators.required],
    })

    this.getDataByINN()
  }

  public getDataByINN() {
    this.orgDataForm.get('INN')?.valueChanges.pipe(
      filter(() => this.pageCount === 1),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.getAgentRequestService.getAgentData(value)),
      takeUntil(this.au.destroyer)
    ).subscribe(options => {
      this.dataByINN = options.suggestions || [];
      this.orgData = this.dataByINN.find((option) => this.orgDataForm.get('INN').value === option?.data?.inn)
    })
  }

  public initPersonalDataForm() {
    this.personalDataForm = this.fb.group({
      NameFirst: [null, Validators.required],
      NameLast: [null, Validators.required],
      NameSecond: [null, Validators.required],
      Male: [false, Validators.required],
      Female: [false, Validators.required],
      INN: [null, Validators.required],
      SNILS: [null, Validators.required],
      BirthDate: [null, Validators.required],
      BirthPlace: [null, Validators.required],
      Role: [null, Validators.required],
      Phone: [null, [Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)]],
      Email: [null, [Validators.required, Validators.email]],
      Nationality: [null, Validators.required],
      PassportDate: [null, Validators.required],
      PassportNumber: [null, Validators.required],
      PassportSeries: [null, Validators.required],
      IssuerCode: [null, Validators.required],
      IssuerTitle: [null, Validators.required]
    })

    this.addSingleChoiceGender()
  }

  public addSingleChoiceGender() {
    this.personalDataForm.get('Male')?.valueChanges.pipe(
      filter(Boolean),
      takeUntil(this.au.destroyer)
    ).subscribe(value => {
      this.personalDataForm.get('Female').setValue(false)
    })

    this.personalDataForm.get('Female')?.valueChanges.pipe(
      filter(Boolean),
      takeUntil(this.au.destroyer)
    ).subscribe(value => {
      this.personalDataForm.get('Male').setValue(false)
    })
  }

  public nextPage() {
    if (this.pageCount >= 1 && this.pageCount <= this.maxPage - 1) {
      this.progress = this.progress$.value + 1
      this.progress$.next(this.progress)
      this.pageCount = this.progress
      if (this.pageCount === 2 && this.orgData?.data) {
        this.setDataToOrgForm(this.orgData.data)
      }
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
    switch (this.pageCount) {
      case 1:
        return this.orgDataForm.get('INN')?.valid
      case 2:
        console.log(this.orgDataForm)
        return this.orgDataForm.valid
      case 3:
        return this.personalDataForm.valid
      case 4:
        return this.filesForm.valid
      default:
        return false
    }
  }

  setDataToOrgForm(data: AgentDataInterface) {
    this.orgDataForm.patchValue({
      Type: data.type,
      ShortTitle: data.name?.short,
      FullTitle: data.name?.full,
      KPP: data.kpp,
      OGRN: data.ogrn,
      OKPO: data.okpo,
      Phone: data.phones?.length ? data.phones[0].value : null,
      Email: data.emails?.length ? data.emails[0].value : null,
      LegalAddress: data.address?.value,
      FactAddress: data.address?.value
    })
  }
}
