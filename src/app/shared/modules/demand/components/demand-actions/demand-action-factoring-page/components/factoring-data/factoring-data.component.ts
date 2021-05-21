import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'src/app/shared/classes/common/guid.class';
import { MIBCommon } from 'src/app/shared/classes/common/mid-common.class';
import { DemandSelectboxInterface } from 'src/app/shared/modules/demand/types/common/demand-selectbox.interface';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { FileService } from 'src/app/shared/services/common/file.service';
import { FileModeInterface } from 'src/app/shared/types/file/file-model.interface';

@Component({
  selector: 'app-factoring-data',
  templateUrl: './factoring-data.component.html',
})
export class FactoringDataComponent implements OnInit {
  @Input()
  currentDemand: any;

  @Output()
  save: EventEmitter<any> = new EventEmitter();

  public organizationTypes: DemandSelectboxInterface[] = [];
  public ruleTypes: DemandSelectboxInterface[] = [];
  public typesOfOwner: DemandSelectboxInterface[] = [];
  public countryList: DemandSelectboxInterface[];
  public regionList: DemandSelectboxInterface[];

  public formFactoring: FormGroup;
  public formAddress: FormGroup;

  public files: FileModeInterface[] = [];

  public addressDialog: boolean = false;

  private currentAddressFormId: any;

  constructor(
    private commonService: CommonService,
    private fileService: FileService,
    private currencyPipe: CurrencyPipe,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.initForm();
    this.initValues();
  }

  onSubmit() {}

  //#region public page actions

  addOtherBank(): void {
    let otherBanks = this.formFactoring.get('otherBanks') as FormArray;
    otherBanks.push(
      this.fb.group({
        otherBankAccountOpenDate: ['', [Validators.required]],
        otherBankAccountCloseDate: ['', [Validators.required]],
        otherBankName: ['', [Validators.required]],
        otherBankOwnerAccount: ['', [Validators.required]],
        otherBankTarget: ['', [Validators.required]],
      })
    );
  }

  addOtherPlace(): void {
    let factoringPlaces = this.formFactoring.get(
      'factoringPlaces'
    ) as FormArray;
    factoringPlaces.push(
      this.fb.group({
        displayAddress: '',
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
        factoringPlacesLegalForm: ['Own', [Validators.required]],
      })
    );

    this.updateDisplayAddress(factoringPlaces.length - 1);
  }

  addFactoringCredits(): void {
    let factoringCredits = this.formFactoring.get(
      'factoringCredits'
    ) as FormArray;
    factoringCredits.push(
      this.fb.group({
        factoringCreditsCreditor: [''],
        factoringPlacesTypeDuty: [''],
        factoringPlacesDateClose: [''],
        factoringPlacesContractSum: [''],
        factoringPlacesBalanceReport: [''],
        factoringPlacesBalanceCurrent: [''],
      })
    );
  }

  addEDIProvider(): void {
    let factoringEDIProviders = this.formFactoring.get(
      'factoringEDIProviders'
    ) as FormArray;
    factoringEDIProviders.push(
      this.fb.group({
        factoringEDIProvidersDebitor: ['', [Validators.required]],
        factoringEDIProvidersProvider: ['', [Validators.required]],
      })
    );
  }

  remove(i: number, type: string): void {
    let other = this.formFactoring.get(type) as FormArray;
    other.removeAt(i);
  }

  //TODO: Replace it in modules/modals/address-modal
  openAddressForm(index) {
    this.currentAddressFormId = index;
    let addresses = this.formFactoring.value.factoringPlaces;
    let address = addresses[index].factoringPlacesAddress;

    this.formAddress.patchValue(address);
    this.addressDialog = true;
  }

  closeModal() {
    this.addressDialog = false;
  }

  saveAddress() {
    this.formFactoring.value.factoringPlaces[
      this.currentAddressFormId
    ].factoringPlacesAddress = this.formAddress.value;

    this.updateDisplayAddress(this.currentAddressFormId);

    this.addressDialog = false;
    this.formAddress.reset();
    this.currentAddressFormId = null;
  }


  onSelect(event, type: string) {
    let files: File[] = event.target.files;

    for (let file of files) {
      let guid = Guid.newGuid();

    //TODO: ADD LEAK MEMORY PROTECTION
      this.commonService.getBase64(file).subscribe((res) => {
        this.fileService
          .uploadFileChunks(res, file.name, file.size.toString(), guid)
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
          );
      });
    }
  }

  onRegionChanged(value) {
    if (value) {
      let regionTitle = this.regionList.find((x) => x.value === value);
      this.formAddress.patchValue({
        RegionTitle: regionTitle,
      });
    }
  }

  removeFile(file: FileModeInterface) {
    this.files.splice(
      this.files.indexOf(this.files.find((x) => x === file)),
      1
    );
  }

  onTypeChanged(value) {
    if (value === 0) {
      this.formFactoring.patchValue({
        organizationLegalForm: null,
      });
    }
  }
  //#endregion

  private updateDisplayAddress(index): void {
    let address =
      this.formFactoring.value.factoringPlaces[index].factoringPlacesAddress;
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

    let editeAddress = (<FormArray>(
      this.formFactoring.controls['factoringPlaces']
    ))
      .at(index)
      .patchValue({
        displayAddress: result,
      });
  }

  private initValues(): void {
    let mibCommon = new MIBCommon();

    this.organizationTypes = mibCommon.getOrganizations();
    this.ruleTypes = mibCommon.getLegalForms();
    this.typesOfOwner = mibCommon.getTypesOfOwner();
    this.countryList = mibCommon.getCountryList();
    this.regionList = mibCommon.getRegionList();

    // this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    // this.backendErrors$ = this.store.pipe(select(errorSelector));
  }

  private initForm(): void {
    //TODO: Break on other pages

    this.formAddress = this.fb.group({
      PostCode: ['', [Validators.required]],
      Country: ['', [Validators.required]],
      RegionCode: [0, [Validators.required]],
      RegionTitle: ['', [Validators.required]],
      City: ['', [Validators.required]],
      District: ['', [Validators.required]],
      Locality: ['', [Validators.required]],
      Street: ['', [Validators.required]],
      House: ['', [Validators.required]],
      Appartment: ['', [Validators.required]],
    });

    this.formFactoring = this.fb.group({
      organizationType: [0, [Validators.required]],
      organizationLegalForm: [''],
      organizationShortName: ['', [Validators.required]],
      organizationINN: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(12),
        ],
      ],
      organizationPhone: ['', [Validators.required]],
      organizationEmail: ['', [Validators.required, Validators.email]],
      organizationWEB: [''],

      bankBik: ['', [Validators.required]],
      bankCorrespondentAccount: ['', [Validators.required]],
      bankName: ['', [Validators.required]],
      bankAccountOpenDate: ['', [Validators.required]],
      bankOwnerAccount: ['', [Validators.required]],
      bankComment: [''],

      otherBanks: this.fb.array([]),

      factoringProducts: ['', [Validators.required]],
      factoringTradeMarks: ['', [Validators.required]],
      factoringShipments: ['', [Validators.required]],
      factoringFinanceLimit: [''],
      factoringClients: ['', [Validators.required]],
      factoringWorkers: [0, [Validators.required]],

      factoringPlaces: this.fb.array([]),

      factoringCredits: this.fb.array([]),

      factoringEDIProviders: this.fb.array([]),
    });

    //TODO: ADD LEAK MEMORY PROTECTION
    this.formFactoring.valueChanges.subscribe((form) => {
      if (form.factoringFinanceLimit) {
        this.formFactoring.patchValue(
          {
            factoringFinanceLimit: this.currencyPipe.transform(
              form.factoringFinanceLimit.replace(/\D/g, '').replace(/^0+/, ''),
              'RUB',
              'symbol',
              '1.0-0'
            ),
          },
          { emitEvent: false }
        );
      }
    });

    this.formFactoring.markAllAsTouched();
    this.formFactoring.markAsDirty();
  }
}
