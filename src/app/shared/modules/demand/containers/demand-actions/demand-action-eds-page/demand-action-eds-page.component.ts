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

@Component({
  selector: 'app-demand-action-eds-page',
  templateUrl: './demand-action-eds-page.component.html',
  styleUrls: ['./demand-action-eds-page.component.scss'],
})
export class DemandActionEDSPageComponent implements OnInit {

  public isEdit: boolean = false;
  public currentDemand: any;
  public currentInformation: FactoringInfoInterface;

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

  private subscription$: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private commonService: CommonService,
    private fileService: FileService,
    private demandService: DemandService
  ) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();
    this.initForm();
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
    this.currentDemand.Files = this.currentDemand.Files.filter(x => x !== file)
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
      })
    );
  }
}