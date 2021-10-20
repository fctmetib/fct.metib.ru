import { Router } from '@angular/router';
import { Guid } from 'src/app/shared/classes/common/guid.class';
import { FileModeInterface } from './../../../../../types/file/file-model.interface';
import { PersonInterface } from 'src/app/shared/types/common/person.interface';
import { PassportInterface } from './../../../../../types/user/passport.interface';
import { CreateDemandEDSRequestInterface } from './../../../types/requests/create-demand-eds-request.interface';
import { DemandService } from './../../../services/demand.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SaveDemandRequestInterface } from '../../../types/requests/save-demand-request.interface';
import { OrganizationDataInterface } from 'src/app/shared/types/organization/organization-data.interface';
import { DemandSelectboxInterface } from '../../../types/common/demand-selectbox.interface';
import { CommonService, PostInterface, RegionInterface } from 'src/app/shared/services/common/common.service';
import { FileService } from 'src/app/shared/services/common/file.service';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, switchMapTo } from 'rxjs/operators';
import { CreateDemandMessageRequestInterface } from '../../../types/requests/create-demand-message-request.interface';
import { FactoringInfoInterface } from '../../../types/common/factoring/factoring-info.interface';
import { ActivatedRoute, Params } from '@angular/router';
import { formatDate } from '@angular/common';
import { AddressModalComponent } from '../../../components/address/address.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ExitGuard } from 'src/app/shared/services/exit.guard';
import * as JSZip from 'jszip';
import { saveAs } from '@progress/kendo-file-saver';
@Component({
  selector: 'app-demand-action-eds-page',
  templateUrl: './demand-action-eds-page.component.html',
  styleUrls: ['./demand-action-eds-page.component.scss'],
})
export class DemandActionEDSPageComponent implements OnInit, ExitGuard {
  public isEdit: boolean = false;
  public currentDemand: any;
  public resultDemand: any;
  public currentInformation: FactoringInfoInterface;

  public isLoading: boolean;
  public alert: boolean;
  public alertMessage = [];

  isUserVerified: boolean;
  formEDS: FormGroup;
  files: FileModeInterface[] = [];

  organizationTypes: DemandSelectboxInterface[] = [
    {
      title: 'Юридическое лицо',
      value: 1,
    },
    {
      title: 'ИП',
      value: 2,
    },
  ];
  ruleTypes: DemandSelectboxInterface[] = [
    {
      title: 'ООО',
      value: 'ООО',
    },
    {
      title: 'ЗАО',
      value: 'ЗАО',
    },
    {
      title: 'ПАО',
      value: 'ПАО',
    },
    {
      title: 'ОАО',
      value: 'ОАО',
    },
    {
      title: 'НАО',
      value: 'НАО',
    },
    {
      title: 'АО',
      value: 'АО',
    },
  ];
  postionTypes: DemandSelectboxInterface[] = [
    { title: 'Директор', value: 'Директор' },
  ];
  genderTypes: DemandSelectboxInterface[] = [
    {
      title: 'Женский',
      value: 0,
    },
    {
      title: 'Мужской',
      value: 1,
    },
  ];
  locationTypes: DemandSelectboxInterface[] = [
    {
      title: 'Россия',
      value: 'Россия',
    },
  ];

  public currentDraftId: number = 0;

  private ref: DynamicDialogRef;
  private _saveDraftAction$: NodeJS.Timeout;
  private subscription$: Subscription = new Subscription();
  public postList: PostInterface[] = [];
  public countryList: RegionInterface[] = [];
  public regionList: RegionInterface[] = [];
  public idCenterList: any[] = [];
  public selectedIdCenter: any;
  isView: any;

  constructor(
    public dialogService: DialogService,
    private authService: AuthService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private commonService: CommonService,
    private fileService: FileService,
    private route: ActivatedRoute,
    private router: Router,
    private demandService: DemandService
  ) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();
    this.initForm();

    this.subscription$.add(
      this.route.queryParams.subscribe((params: Params) => {
        this.isView = params['View'] === 'true' ? true : false
        if (params['ID'] && params['Edit'] === 'false') {
          this.fetch(params['ID']);
        } else {
          this.isLoading = true;
          this.getDraft();
        }
      })
    );

    this.initAdditionalData();

    this._saveDraftAction$ = setInterval(() => this.saveDraft(), 30000);
  }

  public back() {
    const notVerify = 'not-verify';
    const baseUrl = this.isUserVerified ? '' : notVerify;
    this.router.navigate([`${baseUrl}/demand`]);
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
    if (this._saveDraftAction$) {
      clearInterval(this._saveDraftAction$);
    }
  }

  public getDigitalSignatureRequest() {
    this.demandService
      .getDigitalSignatureRequest(this.prepareCoreData())
      .subscribe((resp) => {
        let binaryData = [];
        binaryData.push(resp);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: 'application/msword' })
        );

        downloadLink.setAttribute('download', 'Заявка на выдачу сертификата');
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }

  saveDraft() {
    if(this.isEdit) {
      return;
    }

    let data = this.prepareDraft();

    this.subscription$.add(
      this.demandService
        .addDraftById(this.currentDraftId, data)
        .subscribe((resp) => {
          this.currentDraftId = resp.ID;
          this.showSuccess();
          data;
        })
    );
  }

  initForm() {
    this.formEDS = this.fb.group({
      organizationType: [1],
      organizationLegalForm: [''],
      organizationShortName: ['', [Validators.required]],
      organizationFullName: ['', [Validators.required]],
      organizationINN: ['', [Validators.required]],
      organizationKPP: ['', [Validators.required]],
      organizationOGRN: ['', [Validators.required]],
      organizationOKPO: ['', [Validators.required]],
      organizationPhone: ['', [Validators.required]],
      organizationEmail: ['', [Validators.required]],
      organizationWEB: ['', [Validators.required]],

      // Юр. адресс
      organizationLegalAddress: this.fb.group({
        displayAddress: 'Российская Федерация, 77 Москва',
        factoringPlacesAddress: {
          PostCode: '',
          Country: 'Российская Федерация',
          RegionCode: 77,
          RegionTitle: '',
          City: 'Москва',
          District: '',
          Locality: '',
          Street: '',
          House: '',
          Appartment: '',
        },
      }),
      organizationIsActualAdressEqual: [false],

      // Факт. адресс
      organizationActualAddress: this.fb.group({
        displayAddress: 'Российская Федерация, 77 Москва',
        factoringPlacesAddress: {
          PostCode: '',
          Country: 'Российская Федерация',
          RegionCode: 77,
          RegionTitle: '',
          City: 'Москва',
          District: '',
          Locality: '',
          Street: '',
          House: '',
          Appartment: '',
        },
      }),
      organizationIsLegalAdressEqual: [false],

      // Почтовый. адресс
      organizationPostAddress: this.fb.group({
        displayAddress: 'Российская Федерация, 77 Москва',
        factoringPlacesAddress: {
          PostCode: '',
          Country: 'Российская Федерация',
          RegionCode: 77,
          RegionTitle: '',
          City: 'Москва',
          District: '',
          Locality: '',
          Street: '',
          House: '',
          Appartment: '',
        },
      }),

      ownerSurname: ['', [Validators.required]],
      ownerName: ['', [Validators.required]],
      ownerMiddlename: ['', [Validators.required]],
      ownerGender: [0, [Validators.required]],
      ownerSNILS: ['', [Validators.required]],
      ownerDateBurn: ['', [Validators.required]],
      ownerPlaceBurn: ['', [Validators.required]],
      ownerPhone: ['', [Validators.required]],
      ownerWorkPosition: ['', [Validators.required]],
      ownerEmail: ['', [Validators.required]],
      ownerGeoPosition: [''],
      ownerIdCenter: [''],

      passportNumber: ['', [Validators.required]],
      passportDate: ['', [Validators.required]],
      passportFrom: ['', [Validators.required]],
      passportCode: ['', [Validators.required]],
      passportNationality: ['', [Validators.required]]
    });
  }

  onSubmit() {
    console.log(this.formEDS.value);
    this.subscription$.add(
      this.demandService.add(this.prepareData()).subscribe((resp) => {
        this.alert = true;
        window.scroll(0, 0);
        this.alertMessage = [
          {
            severity: 'success',
            summary: 'Успешно!',
            detail: 'Запрос успешно создан.',
          },
        ];
      })
    );
  }

  private prepareDraft(): any {
    return this.prepareCoreData();
  }

  private prepareData(): SaveDemandRequestInterface<CreateDemandEDSRequestInterface> {
    let data = this.prepareCoreData();
    let result: SaveDemandRequestInterface<CreateDemandEDSRequestInterface> = {
      DraftID: this.currentDraftId,
      Data: data,
    };
    return result;
  }

  private prepareCoreData(): CreateDemandEDSRequestInterface {
    let organization: OrganizationDataInterface = {
      Email: this.formEDS.value.organizationEmail,
      FactAddress: this.formEDS.value.organizationActualAddress.factoringPlacesAddress,
      FactAddressEquals: this.formEDS.value.organizationIsActualAdressEqual,
      ForeignTitle: '',
      FullTitle: this.formEDS.value.organizationFullName,
      LegalAddress:
        this.formEDS.value.organizationLegalAddress.factoringPlacesAddress,
      LegalForm: this.formEDS.value.organizationLegalForm,
      Phone: this.formEDS.value.organizationPhone,
      PostAddress:
        this.formEDS.value.organizationPostAddress.factoringPlacesAddress,
      PostAddressEquals: this.formEDS.value.organizationIsLegalAdressEqual,
      Requisites: {
        INN: this.formEDS.value.organizationINN,
        KPP: this.formEDS.value.organizationKPP,
        OGRN: this.formEDS.value.organizationOGRN,
        OKATO: '',
        OKPO: this.formEDS.value.organizationOKPO,
      },
      ShortTitle: this.formEDS.value.organizationShortName,
      Type: this.formEDS.value.organizationType,
      Website: this.formEDS.value.organizationWEB,
    };

    let passport: PassportInterface = {
      Date:  this.formEDS?.value?.passportDate ? new Date(this.formEDS.value.passportDate).toISOString().slice(0, 19)+ '+03:00' : null,
      IsForeign: false,
      IssuerCode: this.formEDS.value.passportCode,
      IssuerTitle: this.formEDS.value.passportFrom,
      Nationality: this.formEDS.value.passportNationality,
      Number: this.formEDS.value.passportNumber,
    };

    let person: PersonInterface = {
      Name: {
        First: '',
        Last: '',
        Second: '',
      },

      NameFirst: this.formEDS.value.ownerName,
      NameLast: this.formEDS.value.ownerSurname,
      NameSecond: this.formEDS.value.ownerMiddlename,
      Gender: this.formEDS.value.ownerGender,

      SNILS: this.formEDS.value.ownerSNILS,
      BirthDate: this.formEDS.value.ownerDateBurn,
      BirthPlace: this.formEDS.value.ownerPlaceBurn,

      Phone: this.formEDS.value.ownerPhone,
      Email: this.formEDS.value.ownerEmail,
    };

    let data: CreateDemandEDSRequestInterface = {
      Files: this.files,
      Organization: organization,
      Passport: passport,
      Person: person,
      PersonPosition: this.formEDS.value.ownerWorkPosition,
      Type: 'DigitalSignature',
    };

    return data;
  }

  onAdd(file) {
    this.files.push(file);
  }

  onRemove(file) {
    this.files = this.files.filter((x) => x !== file);
  }

  public selectGeoPosition(event) {
    this.commonService.getIdCenters(event.value).subscribe(response => {
      this.idCenterList = response;
    });
  }

  public setIDCenter(event) {
    this.selectedIdCenter = this.idCenterList.find(x => x.guid === event.value);
  }

  handleSendMessage(event: CreateDemandMessageRequestInterface) {
    this.subscription$.add(
      this.demandService
        .addMessageByDemandId(this.currentDemand.ID, event)
        .subscribe((resp) => {
          this.fetch(this.currentDemand.ID);
        })
    );
  }

  handleRemoveFile(file: FileModeInterface) {
    this.currentDemand.Files = this.currentDemand.Files.filter(
      (x) => x !== file
    );
  }

  public isFileInvalid(type: string): boolean {
    let isInvalid = false;

    // crtInds = currentFileIdentifiers
    let crtInds = this.files.map((file) => file.Identifier);
    if (crtInds.includes(type)) {
      isInvalid = false;
    } else {
      isInvalid = true;
    }

    return isInvalid;
  }

  public isFilesInvalid(): boolean {
    if (this.isEdit) {
      return false;
    }

    let isInvalid = false;

    // crtInds = currentFileIdentifiers
    let crtInds = this.files.map((file) => file.Identifier);
    if (crtInds.length < 1) {
      return true;
    }

    if (
      crtInds.includes('Inn') &&
      crtInds.includes('Ogrn') &&
      crtInds.includes('Snils') &&
      crtInds.includes('Director') &&
      crtInds.includes('Passport')
    ) {
      isInvalid = false;
    } else {
      isInvalid = true;
    }

    return isInvalid;
  }

  public isAddressEqual(type) {
    if (type === 'organizationActualAddress') {
      let legalAddress =
        this.formEDS.value.organizationLegalAddress.factoringPlacesAddress;
      let addressEdited = <FormControl>(
        this.formEDS.controls['organizationActualAddress']
      );
      addressEdited.patchValue({
        factoringPlacesAddress: legalAddress,
      });
      this.updateDisplayAddress('organizationActualAddress');
    }
    if (type === 'organizationPostAddress') {
      let legalAddress =
        this.formEDS.value.organizationLegalAddress.factoringPlacesAddress;
      let addressEdited = <FormControl>(
        this.formEDS.controls['organizationPostAddress']
      );
      addressEdited.patchValue({
        factoringPlacesAddress: legalAddress,
      });
      this.updateDisplayAddress('organizationPostAddress');
    }
  }

  openAddressForm(type) {
    let addresses = this.formEDS.value[type];
    let address = addresses.factoringPlacesAddress;

    this.ref = this.dialogService.open(AddressModalComponent, {
      header: 'Укажите Адрес',
      width: '650px',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      styleClass: 'p-fluid',
      data: {
        address,
      },
    });

    this.ref.onClose.subscribe((data: any) => {
      if (data) {
        this.formEDS.value[type].factoringPlacesAddress = data;
        this.updateDisplayAddress(type);
      }
    });
  }

  private updateDisplayAddress(type): void {
    let address = this.formEDS.value[type].factoringPlacesAddress;
    let result = '';

    console.log(address);

    if (address?.PostCode) {
      result = result + ' ' + address.PostCode;
    }
    if (address?.Country) {
      result = result + ' ' + address.Country;
    }
    if (address?.RegionCode) {
      result = result + ' ' + address.RegionCode;
    }
    if (address?.RegionTitle) {
      result = result + ' ' + address.RegionTitle;
    }
    if (address?.City) {
      result = result + ' ' + address.City;
    }
    if (address?.District) {
      result = result + ' ' + address.District;
    }
    if (address?.Locality) {
      result = result + ' ' + address.Locality;
    }
    if (address?.Street) {
      result = result + ' ' + address.Street;
    }
    if (address?.House) {
      result = result + ' ' + address.House;
    }
    if (address?.Appartment) {
      result = result + ' ' + address.Appartment;
    }

    let addressEdited = <FormControl>this.formEDS.controls[type];
    addressEdited.patchValue({
      displayAddress: result,
      factoringPlacesAddress: address,
    });
  }

  private getDraft() {
    this.subscription$.add(
      this.demandService
        .prepareDemandByType('DigitalSignature')
        .subscribe((resp) => {
          this.currentDemand = resp;
          this.convertToFormData();
          this.isLoading = false;
        })
    );
  }

  private fetch(id: number) {
    this.subscription$.add(
      this.demandService.getDemandById(id).subscribe((resp) => {
        this.resultDemand = resp.Result
        this.currentDemand = resp.Data;
        this.currentInformation = {
          ID: resp.ID,
          Messages: resp.Messages,
          DateCreated: resp.DateCreated,
          DateModify: resp.DateModify,
          DateStatus: resp.DateStatus,
          Steps: resp.Steps,
          Status: resp.Status,
          Type: resp.Type,
          Manager: null,
        };
        console.log('Fetched, is view', this.currentDemand);
        this.isEdit = true;
        this.convertToFormData();
      })
    );
  }

  private convertToFormData() {
    console.log('THIS IS CURRENT DEMAND:',this.currentDemand);
    const organization: OrganizationDataInterface =
      this.currentDemand.Organization;
    const passport: PassportInterface = this.currentDemand.Passport;
    const person: PersonInterface = this.currentDemand.Person;

    this.formEDS.patchValue({
      organizationType: organization?.Type ? organization?.Type : '',
      organizationLegalForm: organization?.LegalForm
        ? organization?.LegalForm
        : '',
      organizationShortName: organization?.ShortTitle
        ? organization?.ShortTitle
        : '',
      organizationFullName: organization?.FullTitle
        ? organization?.FullTitle
        : '',
      organizationINN: organization?.Requisites?.INN
        ? organization?.Requisites?.INN
        : '',
      organizationKPP: organization?.Requisites?.KPP
        ? organization?.Requisites?.KPP
        : '',
      organizationOGRN: organization?.Requisites?.OGRN
        ? organization?.Requisites?.OGRN
        : '',
      organizationOKPO: organization?.Requisites?.OKPO
        ? organization?.Requisites?.OKPO
        : '',
      organizationPhone: organization?.Phone ? organization?.Phone : '',
      organizationEmail: organization?.Email ? organization?.Email : '',
      organizationWEB: organization?.Website ? organization?.Website : '',

      organizationIsActualAdressEqual: organization?.FactAddressEquals
        ? organization?.FactAddressEquals
        : '',

      organizationIsLegalAdressEqual: organization?.PostAddressEquals
        ? organization?.PostAddressEquals
        : '',

      ownerSurname: person?.NameLast ? person?.NameLast : '',
      ownerName: person?.NameFirst ? person?.NameFirst : '',
      ownerMiddlename: person?.NameSecond ? person?.NameSecond : '',
      ownerGender: person?.Gender ? person?.Gender : '',
      ownerSNILS: person?.SNILS ? person?.SNILS : '',
      ownerDateBurn: person?.BirthDate
        ? formatDate(person?.BirthDate, 'yyyy-MM-dd', 'en')
        : '',
      ownerPlaceBurn: person?.BirthPlace ? person?.BirthPlace : '',
      ownerPhone: person?.Phone ? person?.Phone : '',
      ownerWorkPosition: this.currentDemand?.PersonPosition ? this.currentDemand?.PersonPosition : '',
      ownerEmail: person?.Email ? person?.Email : '',
      // ownerGeoPosition: person?.BirthPlace ? person?.BirthPlace : '',

      passportNumber: passport?.Number ? passport?.Number : '',
      passportDate: passport?.Date
        ? formatDate(passport.Date, 'yyyy-MM-dd', 'en')
        : '',
      passportFrom: passport?.IssuerTitle ? passport?.IssuerTitle : '',
      passportCode: passport?.IssuerCode ? passport?.IssuerCode : '',
      passportNationality: passport?.Nationality ? passport.Nationality: ''
    });

    this.formEDS.controls['organizationLegalAddress'].patchValue({
      factoringPlacesAddress: organization?.LegalAddress
    });
    this.formEDS.controls['organizationActualAddress'].patchValue({
      factoringPlacesAddress: organization?.FactAddress
    });
    this.formEDS.controls['organizationPostAddress'].patchValue({
      factoringPlacesAddress: organization?.PostAddress
    });

    this.updateDisplayAddress('organizationLegalAddress')
    this.updateDisplayAddress('organizationActualAddress')
    this.updateDisplayAddress('organizationPostAddress')
  }

  private initAdditionalData(): void {
    this.subscription$.add(
      this.commonService.getPosts().subscribe((posts) => {
        this.postList = posts;
      })
    );
    this.subscription$.add(
      this.commonService.getCountries().subscribe((countries) => {
        this.countryList = countries;
      })
    );
    this.subscription$.add(
      this.commonService.getRegions().subscribe((regions) => {
        this.regionList = regions;
      })
    );
  }

  private showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Успешно',
      detail: 'Черновик успешно сохранен!',
    });
  }

  canDeactivate(): boolean | Observable<boolean> {
    return confirm(
      'Внимание! Возможно, Вы не сохранили данные, хотите покинуть страницу?'
    );
  }
}
