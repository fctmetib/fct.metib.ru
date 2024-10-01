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
      Type: null,
      ShortTitle: null,
      FullTitle: null,
      KPP: null,
      OGRN: null,
      OKPO: null,
      Phone: null,
      Email: null,
      LegalAddress: null,
      FactAddress: false
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
      NameFirst: null,
      NameLast: null,
      NameSecond: null,
      Gender: false,
      INN: false,
      SNILS: null,
      BirthDate: null,
      BirthPlace: null,
      Role: null,
      Phone: null,
      Email: null,
      Nationality: null,
      PassportDate: null,
      PassportNumber: null,
      IssuerSeries: null,
      IssuerCode: null,
      IssuerTitle: null
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
        return this.orgDataForm?.valid
      case 3:
        return this.personalDataForm?.valid
      case 4:
        return this.filesForm?.valid
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

/*  let organization: OrganizationDataInterface = {
    Email: form.organizationEmail,
    FactAddress: form.organizationActualAddress.factoringPlacesAddress,
    FactAddressEquals: form.organizationIsActualAdressEqual,
    ForeignTitle: '',
    FullTitle: form.organizationFullName,
    LegalAddress: form.organizationLegalAddress.factoringPlacesAddress,
    LegalForm: form.organizationLegalForm,
    Phone: form.organizationPhone,
    PostAddress: form.organizationPostAddress.factoringPlacesAddress,
    PostAddressEquals: form.organizationIsLegalAdressEqual,
    Requisites: {
      INN: form.organizationINN,
      KPP: form.organizationKPP,
      OGRN: form.organizationOGRN,
      OKATO: '',
      OKPO: form.organizationOKPO,
    },
    ShortTitle: form.organizationShortName,
    Type: form.organizationType,
    Website: form.organizationWEB,
  };

  let passport: PassportInterface = {
    Date: form?.passportDate
      ? new Date(form.passportDate).toISOString().slice(0, 19) + '+03:00'
      : null,
    IsForeign: false,
    IssuerCode: form.passportCode,
    IssuerTitle: form.passportFrom,
    Nationality: form.passportNationality,
    Number: form.passportNumber,
  };

  let person: PersonInterface = {
    Name: {
      First: '',
      Last: '',
      Second: '',
    },

    NameFirst: form.ownerName,
    NameLast: form.ownerSurname,
    NameSecond: form.ownerMiddlename,
    Gender: form.ownerGender,

    SNILS: form.ownerSNILS,
    BirthDate: new Date(form.ownerDateBurn),
    BirthPlace: form.ownerPlaceBurn,

    Phone: form.ownerPhone,
    Email: form.ownerEmail,
    INN: form.ownerINN,
  };

  let data: CreateDemandEDSRequestInterface = {
    Files: files,
    Organization: organization,
    Passport: passport,
    Person: person,
    PersonPosition: form.ownerWorkPosition,
    Type: 'DigitalSignature',
  };
  return data;
}*/
}
