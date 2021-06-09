import { Guid } from 'src/app/shared/classes/common/guid.class';
import { FileModeInterface } from './../../../../../types/file/file-model.interface';
import { PersonInterface } from 'src/app/shared/types/common/person.interface';
import { PassportInterface } from './../../../../../types/user/passport.interface';
import { CreateDemandEDSRequestInterface } from './../../../types/requests/create-demand-eds-request.interface';
import { DemandService } from './../../../services/demand.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SaveDemandRequestInterface } from '../../../types/requests/save-demand-request.interface';
import { OrganizationInterface } from 'src/app/shared/types/organization/organization.interface';
import { OrganizationDataInterface } from 'src/app/shared/types/organization/organization-data.interface';
import { DemandSelectboxInterface } from '../../../types/common/demand-selectbox.interface';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { FileService } from 'src/app/shared/services/common/file.service';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CreateDemandMessageRequestInterface } from '../../../types/requests/create-demand-message-request.interface';
import { FactoringInfoInterface } from '../../../types/common/factoring/factoring-info.interface';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-demand-action-eds-page',
  templateUrl: './demand-action-eds-page.component.html',
  styleUrls: ['./demand-action-eds-page.component.scss'],
})
export class DemandActionEDSPageComponent implements OnInit {
  public isEdit: boolean = false;
  public currentDemand: any;
  public currentInformation: FactoringInfoInterface;

  public isLoading: boolean;

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
  private currentDraftId: number = 0;
  private subscription$: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private commonService: CommonService,
    private fileService: FileService,
    private route: ActivatedRoute,
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
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
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
      organizationLegalAddress: ['', [Validators.required]],
      organizationIsActualAdressEqual: [false],

      organizationActualAddress: ['', [Validators.required]],
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
    let organization: OrganizationDataInterface = {
      Email: '',
      FactAddress: this.formEDS.value.organizationActualAddress,
      FactAddressEquals: this.formEDS.value.organizationIsActualAdressEqual,
      ForeignTitle: '',
      FullTitle: '',
      LegalAddress: this.formEDS.value.organizationFullName,
      LegalForm: this.formEDS.value.organizationLegalForm,
      Phone: this.formEDS.value.organizationPhone,
      PostAddress: this.formEDS.value.organizationLegalAddress,
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

    let data: SaveDemandRequestInterface<CreateDemandEDSRequestInterface> = {
      DraftID: 0,
      Data: {
        Files: this.files,
        Organization: organization,
        Passport: passport,
        Person: person,
        PersonPosition: this.formEDS.value.ownerWorkPosition,
        Type: 'DigitalSignature',
      },
    };

    this.subscription$.add(this.demandService.add(data).subscribe());
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
      organizationType: organization.Type,
      organizationLegalForm: organization.LegalForm,
      organizationShortName: organization.ShortTitle,
      organizationFullName: organization.FullTitle,
      organizationINN: organization.Requisites.INN,
      organizationKPP: organization.Requisites.KPP,
      organizationOGRN: organization.Requisites.OGRN,
      organizationOKPO: organization.Requisites.OKPO,
      organizationPhone: organization.Phone,
      organizationEmail: organization.Email,
      organizationWEB: organization.Website,
      organizationLegalAddress: organization.LegalAddress,
      organizationIsActualAdressEqual: organization.FactAddressEquals,

      organizationActualAddress: organization.FactAddress,
      organizationIsLegalAdressEqual: organization.PostAddressEquals,

      ownerSurname: person.NameLast,
      ownerName: person.NameFirst,
      ownerMiddlename: person.NameSecond,
      ownerGender: person.Gender,
      ownerSNILS: person.SNILS,
      ownerDateBurn: person.BirthDate,
      ownerPlaceBurn: person.BirthPlace,
      ownerPhone: person.Phone,
      ownerWorkPosition: this.currentDemand.PersonPosition,
      ownerEmail: person.Email,
      ownerGeoPosition: person.BirthPlace,

      passportNumber: passport.Number,
      passportDate: passport.Date,
      passportFrom: passport.IssuerTitle,
      passportCode: passport.IssuerCode,
    });
  }
}
