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
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SaveDemandRequestInterface } from '../../../types/requests/save-demand-request.interface';
import { OrganizationDataInterface } from 'src/app/shared/types/organization/organization-data.interface';
import { DemandSelectboxInterface } from '../../../types/common/demand-selectbox.interface';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { FileService } from 'src/app/shared/services/common/file.service';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
  public currentInformation: FactoringInfoInterface;

  public isLoading: boolean;
  public alert: boolean;
  public alertMessage: string;

  isUserVerified: boolean;
  formEDS: FormGroup;
  files: FileModeInterface[] = [];

  organizationTypes: DemandSelectboxInterface[] = [
    {
      title: 'Юридическое лицо',
      value: 'Юридическое лицо',
    },
    {
      title: 'ИП',
      value: 'ИП',
    },
  ];
  ruleTypes: DemandSelectboxInterface[] = [
    {
      title: 'ООО',
      value: 'ООО',
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
        if (params['ID']) {
          this.fetch(params['ID']);
        } else {
          this.isLoading = true;
          this.getDraft();
        }
      })
    );

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
    this.demandService.getDigitalSignatureRequest(this.prepareCoreData()).subscribe(resp => {
      let binaryData = [];
      binaryData.push(resp);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: 'application/msword'}));

      downloadLink.setAttribute('download', 'Заявка на выдачу сертификата');
      document.body.appendChild(downloadLink);
      downloadLink.click();
    });
  }

  saveDraft() {
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
      organizationType: ['', [Validators.required]],
      organizationLegalForm: ['', [Validators.required]],
      organizationShortName: ['', [Validators.required]],
      organizationFullName: ['', [Validators.required]],
      organizationINN: ['', [Validators.required]],
      organizationKPP: ['', [Validators.required]],
      organizationOGRN: ['', [Validators.required]],
      organizationOKPO: ['', [Validators.required]],
      organizationPhone: ['', [Validators.required]],
      organizationEmail: ['', [Validators.required]],
      organizationWEB: ['', [Validators.required]],
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
      ownerGeoPosition: ['', [Validators.required]],

      passportNumber: ['', [Validators.required]],
      passportDate: ['', [Validators.required]],
      passportFrom: ['', [Validators.required]],
      passportCode: ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log(this.formEDS.value);
    this.subscription$.add(
      this.demandService.add(this.prepareData()).subscribe(resp => {
        this.alert = true;
        this.alertMessage = 'Запрос успешно создан.';
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
      Data: data
    };
    return result;
  }

  private prepareCoreData(): CreateDemandEDSRequestInterface {
    let organization: OrganizationDataInterface = {
      Email: '',
      FactAddress: this.formEDS.value.organizationActualAddress,
      FactAddressEquals: this.formEDS.value.organizationIsActualAdressEqual,
      ForeignTitle: '',
      FullTitle: '',
      LegalAddress:
        this.formEDS.value.organizationLegalAddress.factoringPlacesAddress,
      LegalForm: this.formEDS.value.organizationLegalForm,
      Phone: this.formEDS.value.organizationPhone,
      PostAddress:
        this.formEDS.value.organizationLegalAddress.factoringPlacesAddress,
      PostAddressEquals: this.formEDS.value.organizationIsLegalAdressEqual,
      Requisites: {
        INN: this.formEDS.value.organizationINN,
        KPP: this.formEDS.value.organizationKPP,
        OGRN: this.formEDS.value.organizationOGRN,
        OKATO: '',
        OKPO: this.formEDS.value.organizationOKPO,
      },
      ShortTitle: this.formEDS.value.organizationShortName,
      Type: 1,
      Website: this.formEDS.value.organizationWEB,
    };

    let passport: PassportInterface = {
      Date: this.formEDS.value.passportDate,
      IsForeign: false,
      IssuerCode: this.formEDS.value.passportCode,
      IssuerTitle: this.formEDS.value.passportFrom,
      Nationality: 'RUS',
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
      BirthDate: this.formEDS.value.valueownerDateBurn,
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

  onSelect(event, type: string) {
    let files: File[] = event.target.files;

    for (let file of files) {
      let guid = Guid.newGuid();

      this.subscription$.add(
        this.commonService
          .getBase64(file)
          .pipe(
            switchMap((res) => {
              return this.fileService.uploadFileChunks(
                res,
                file.name,
                file.size.toString(),
                guid
              );
            })
          )
          .subscribe(
            (res) => {
              console.log(res);
              this.files.push({
                Code: res.Code,
                FileName: res.FileName,
                ID: res.ID,
                Size: res.Size,
                Identifier: type,
              });
            },
            (err) => console.log(err)
          )
      );
    }
  }

  removeFile(file: FileModeInterface) {
    this.files.splice(
      this.files.indexOf(this.files.find((x) => x === file)),
      1
    );
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

  public isAddressEqual(type) {
    if (type === 'organizationLegalAddress') {
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
    if (type === 'organizationActualAddress') {
      let legalAddress =
        this.formEDS.value.organizationActualAddress.factoringPlacesAddress;
      let addressEdited = <FormControl>(
        this.formEDS.controls['organizationLegalAddress']
      );
      addressEdited.patchValue({
        factoringPlacesAddress: legalAddress,
      });
      this.updateDisplayAddress('organizationLegalAddress');
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

    if (address.PostCode) {
      result = result + ' ' + address.PostCode;
    }
    if (address.Country) {
      result = result + ' ' + address.Country;
    }
    if (address.RegionCode) {
      result = result + ' ' + address.RegionCode;
    }
    if (address.RegionTitle) {
      result = result + ' ' + address.RegionTitle;
    }
    if (address.City) {
      result = result + ' ' + address.City;
    }
    if (address.District) {
      result = result + ' ' + address.District;
    }
    if (address.Locality) {
      result = result + ' ' + address.Locality;
    }
    if (address.Street) {
      result = result + ' ' + address.Street;
    }
    if (address.House) {
      result = result + ' ' + address.House;
    }
    if (address.Appartment) {
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
        this.currentDemand = resp;
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
        console.log(this.currentDemand);
        this.isEdit = true;
        this.convertToFormData();
      })
    );
  }

  private convertToFormData() {
    console.log(this.currentDemand);
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
      ownerDateBurn: person.BirthDate
        ? formatDate(person.BirthDate, 'yyyy-MM-dd', 'en')
        : '',
      ownerPlaceBurn: person?.BirthPlace ? person?.BirthPlace : '',
      ownerPhone: person?.Phone ? person?.Phone : '',
      ownerWorkPosition: this.currentDemand?.PersonPosition
        ? this.currentDemand?.PersonPosition
        : '',
      ownerEmail: person?.Email ? person?.Email : '',
      ownerGeoPosition: person?.BirthPlace ? person?.BirthPlace : '',

      passportNumber: passport?.Number ? passport?.Number : '',
      passportDate: passport?.Date
        ? formatDate(passport.Date, 'yyyy-MM-dd', 'en')
        : '',
      passportFrom: passport?.IssuerTitle ? passport?.IssuerTitle : '',
      passportCode: passport?.IssuerCode ? passport?.IssuerCode : '',
    });

    this.formEDS.controls['organizationActualAddress'].patchValue({
      displayAddress: this.getDisplayAddress(organization?.FactAddress),
      factoringPlacesAddress: organization?.FactAddress,
    });

    // organizationActualAddress: organization?.FactAddress
    // ? organization?.FactAddress
    // : '',
    // organizationLegalAddress: organization?.LegalAddress
    // ? organization?.LegalAddress
    // : '',
  }

  private getDisplayAddress(address): string {
    return '';
  }

  private showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Успешно',
      detail: 'Черновик успешно сохранен!',
    });
  }

  canDeactivate(): boolean | Observable<boolean> {
    return confirm('Внимание! Возможно, Вы не сохранили данные, хотите покинуть страницу?');
  }
}
