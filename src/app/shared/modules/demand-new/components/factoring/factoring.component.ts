import { Validators } from '@angular/forms';
import { DemandValuesIniter } from './../../tools/demand-values-initer';
import { FileModeInterface } from 'src/app/shared/types/file/file-model.interface';
import { DemandConverter } from './../../tools/demand-converter';
import { DoDemandPageActionType } from './../../types/navigation-service/do-demand-page-action-type';
import { FormGenerator } from './../../tools/form-generator';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DoDemandActionInterface } from '../../types/navigation-service/do-demand-action.interface';
import { DemandActionType } from '../../types/common/demand-action-type';
import { DemandNavigationService } from '../../services/demand-navigation.service';
import { DemandLoadingService } from '../../services/demand-loading.service';
import {
  CommonService,
  PostInterface,
  RegionInterface,
} from 'src/app/shared/services/common/common.service';
import { Observable, Subscription } from 'rxjs';
import { DemandNavigationInterface } from '../../types/common/demand-navigation.interface';
import { DemandSelectboxInterface } from '../../types/demand-selectbox.interface';
import { DemandAddonAccountInterface } from '../../types/demand-addon-account.interface';
import { DemandPropertiesInterface } from '../../types/demand-properties.interface';
import { DemandObligationInterface } from '../../types/demand-obligation.interface';
import { formatDate } from '@angular/common';
import { DemandEDIInterface } from '../../types/demand-edi.interface';

@Component({
  selector: 'factoring',
  styleUrls: ['./factoring.component.scss'],
  templateUrl: 'factoring.component.html',
})
export class FactoringComponent implements OnInit {
  // Форма
  public form: FormGroup;

  // Данные, для выпадающих списков
  public organizationTypes: DemandSelectboxInterface[] =
    DemandValuesIniter.organizationTypes;
  public ruleTypes: DemandSelectboxInterface[] = DemandValuesIniter.ruleTypes;
  public genderTypes: DemandSelectboxInterface[] =
    DemandValuesIniter.genderTypes;
  public postList: PostInterface[] = [];
  public countryList: RegionInterface[] = [];
  public regionList: RegionInterface[] = [];
  public idCenterList: any[] = [];

  // Системные переменные
  public requestLoading$: Observable<boolean>;
  public demandNavigationConfig: DemandNavigationInterface;
  private _subscription$: Subscription = new Subscription();
  private _demandConverter: DemandConverter;

  // UI
  public selectedIdCenter: any;

  // Файлы
  public files: FileModeInterface[] = [];

  //#region Factoring Request Region
  // TODO: Do logic
  public resultsBIK: string[];
  public resultsBankname: string[];
  public typesOfOwner: DemandSelectboxInterface[] = [];
  isRequestLoading: boolean = false; // this was an Input Property
  //#endregion

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private _demandLoadingService: DemandLoadingService,
    private _demandNavigationService: DemandNavigationService
  ) {
    this._demandConverter = new DemandConverter();
  }

  ngOnInit() {
    this._initValues();
    this._initForm();
    this._initAdditionalData();
    this._getDemandConfig();
    this._getCurrentDemand();
  }

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }

  public onSubmit() {
    this._doDemandAction(DoDemandPageActionType.CREATE);
  }

  //#region Factoring Request Region

  public search(event): void {
    // TODO: Move it to Demand Action Component
    // this.subscription$.add(
    //   this.commonService.getBankByBIK(event.query).subscribe((data) => {
    //     this.banksFounded = data;
    //     this.resultsBIK = data.map((result) => result.BIC);
    //   })
    // );
  }

  public onOtherBankSelect(indexOtherBank: number, bankInfo: string) {
    // TODO: Do logic
    // let bank = this.banksFounded.find(
    //   (x) => x.BIC === bankInfo || x.Name === bankInfo
    // );
    // this.formFactoring
    //   .get('otherBanks')
    //   ['controls'][indexOtherBank].patchValue({
    //     otherBankName: bank.Name,
    //   });
  }

  public onBankSelect(bankInfo: string) {
    // TODO: Do logic
    // let bank = this.banksFounded.find(
    //   (x) => x.BIC === bankInfo || x.Name === bankInfo
    // );
    // this.formFactoring.patchValue({
    //   bankBik: bank.BIC,
    //   bankCorrespondentAccount: bank.AccountBank,
    //   bankName: bank.Name,
    // });
  }

  public searchByBankName(event): void {
    // TODO: Move it to Demand Action Component
    // this.subscription$.add(
    //   this.commonService.getBankByName(event.query).subscribe((data) => {
    //     this.banksFounded = data;
    //     this.resultsBankname = data.map((result) => result.Name);
    //   })
    // );
  }

  addOtherBank(existBank?: DemandAddonAccountInterface): void {
    // TODO: Do logic
    // let otherBanks = this.formFactoring.get('otherBanks') as FormArray;
    // otherBanks.push(
    //   this.fb.group({
    //     otherBankAccountOpenDate: [
    //       existBank?.Date
    //         ? formatDate(existBank?.Date, 'yyyy-MM-dd', 'en')
    //         : '',
    //       [Validators.required],
    //     ],
    //     otherBankAccountCloseDate: [
    //       existBank?.Expire
    //         ? formatDate(existBank?.Expire, 'yyyy-MM-dd', 'en')
    //         : '',
    //     ],
    //     otherBankName: [
    //       existBank?.Bank ? existBank?.Bank : '',
    //       [Validators.required],
    //     ],
    //     otherBankOwnerAccount: [
    //       existBank?.Number ? existBank?.Number : '',
    //       [Validators.required],
    //     ],
    //     otherBankTarget: [
    //       existBank?.Comment ? existBank?.Comment : '',
    //       [Validators.required],
    //     ],
    //   })
    // );
  }

  addOtherPlace(existProp?: DemandPropertiesInterface): void {
    let factoringPlaces = this.form.get('factoringPlaces') as FormArray;
    factoringPlaces.push(
      this.fb.group({
        displayAddress: '',
        factoringPlacesAddress: {
          PostCode: existProp ? existProp.Address.PostCode : '',
          Country: existProp
            ? existProp.Address.Country
            : 'Российская Федерация',
          RegionCode: existProp ? existProp.Address.RegionCode : 77,
          RegionTitle: existProp ? existProp.Address.RegionTitle : '',
          City: existProp ? existProp.Address.City : 'Москва',
          District: existProp ? existProp.Address.District : '',
          Locality: existProp ? existProp.Address.Locality : '',
          Street: existProp ? existProp.Address.Street : '',
          House: existProp ? existProp.Address.House : '',
          Appartment: existProp ? existProp.Address.Appartment : '',
        },
        factoringPlacesLegalForm: [
          existProp?.Type ? existProp?.Type : '',
          [Validators.required],
        ],
      })
    );

    // TODO: Do logic
    //  this.updateDisplayAddress(factoringPlaces.length - 1);
  }

  addFactoringCredits(existCredit?: DemandObligationInterface): void {
    let factoringCredits = this.form.get('factoringCredits') as FormArray;
    factoringCredits.push(
      this.fb.group({
        factoringCreditsCreditor: [existCredit ? existCredit.Creditor : ''],
        factoringPlacesTypeDuty: [existCredit ? existCredit.Type : ''],
        factoringPlacesDateClose: [
          existCredit?.Date
            ? formatDate(existCredit?.Date, 'yyyy-MM-dd', 'en')
            : '',
        ],
        factoringPlacesContractSum: [existCredit ? existCredit.Summ : ''],
        factoringPlacesBalanceReport: [
          existCredit ? existCredit.ReportingRest : '',
        ],
        factoringPlacesBalanceCurrent: [
          existCredit ? existCredit.CurrentRest : '',
        ],
      })
    );
  }

  addEDIProvider(existEDI?: DemandEDIInterface): void {
    let factoringEDIProviders = this.form.get(
      'factoringEDIProviders'
    ) as FormArray;
    factoringEDIProviders.push(
      this.fb.group({
        factoringEDIProvidersDebitor: [
          existEDI ? existEDI.Company : '',
          [Validators.required],
        ],
        factoringEDIProvidersProvider: [
          existEDI ? existEDI.EDIProvider : '',
          [Validators.required],
        ],
      })
    );
  }

  remove(i: number, type: string): void {
    let other = this.form.get(type) as FormArray;
    other.removeAt(i);
  }

  openAddressForm(index) {
    // TODO: Do logic
    // this.currentAddressFormId = index;
    // let addresses = this.formFactoring.value.factoringPlaces;
    // let address = addresses[index].factoringPlacesAddress;
    // this.ref = this.dialogService.open(AddressModalComponent, {
    //   header: 'Укажите Адрес',
    //   width: '650px',
    //   contentStyle: { 'max-height': '500px', overflow: 'auto' },
    //   baseZIndex: 10000,
    //   styleClass: 'p-fluid',
    //   data: {
    //     address,
    //     index,
    //   },
    // });
    // this.ref.onClose.subscribe((data: any) => {
    //   if (data) {
    //     this.formFactoring.value.factoringPlaces[
    //       this.currentAddressFormId
    //     ].factoringPlacesAddress = data;
    //     this.updateDisplayAddress(this.currentAddressFormId);
    //   }
    // });
  }

  onTypeChanged(value) {
    if (value === 0) {
      this.form.patchValue({
        organizationLegalForm: null,
      });
    }
  }
  //#endregion

  /**
   * Ловит событие на добавление нового файла и добавляет его в список файлов, в форме
   * @param file - пойманный файл
   * @returns void
   */
  public onAdd(file): void {
    this.files.push(file);
  }

  /**
   * Ловит событие на удаление существующего файла и удаляет его из списка файлов, в форме
   * @param file - принимает событие из dropdown
   * @returns void
   */
  public onRemove(file): void {
    this.files = this.files.filter((x) => x !== file);
  }

  /**
   * Предоставляет для UI enum типов события (редактирование, создание и тд)
   * @returns enum с типами
   */
  public get demandActionType(): typeof DemandActionType {
    return DemandActionType;
  }

  /**
   * Осуществляет проверку, если все файлы загружены, то возвращает false (ошибок нет), иначе true (есть ошибки)
   * @returns {boolean} решение валидации
   */
  public isFilesInvalid(): boolean {
    if (
      this.demandNavigationConfig.demandActionType ===
      DemandActionType.EDIT_CREATED
    ) {
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

  private _doDemandAction(type: DoDemandPageActionType): void {
    const convertedForm = this._demandConverter.convertToApiData(
      this.demandNavigationConfig.demandAction,
      this.form.getRawValue(),
      this.files
    );

    let requestData;

    switch (type) {
      case DoDemandPageActionType.CREATE:
        // Для всех форм при создании указывается DraftID = 0, если отстуствует иное значение
        requestData = {
          Data: convertedForm,
        };
        break;
      case DoDemandPageActionType.SAVE_DRAFT:
        requestData = convertedForm;
        break;
      case DoDemandPageActionType.UPDATE:
        // DraftID заполняется в demand-action.component.ts
        requestData = {
          Data: convertedForm,
        };
        break;
    }

    const doActionData: DoDemandActionInterface = {
      data: requestData,
      type: type,
    };
    this._demandNavigationService.setDoDemandAction(doActionData);
  }

  private _initValues() {
    this.requestLoading$ = this._demandLoadingService.demandRequestLoading$;

    this._subscription$.add(
      this._demandNavigationService.doDemandSave$.subscribe((saveAction) => {
        this._doDemandAction(DoDemandPageActionType.SAVE_DRAFT);
      })
    );
  }

  private _initForm() {
    const formGenerator = new FormGenerator(this.fb);
    this.form = formGenerator.generateFactoringForm();
  }

  private _initAdditionalData(): void {
    this._subscription$.add(
      this.commonService.getPosts().subscribe((posts) => {
        this.postList = posts;
      })
    );
    this._subscription$.add(
      this.commonService.getCountries().subscribe((countries) => {
        this.countryList = countries;
      })
    );
    this._subscription$.add(
      this.commonService.getRegions().subscribe((regions) => {
        this.regionList = regions;
      })
    );
  }

  private _getDemandConfig(): void {
    this._subscription$.add(
      this._demandNavigationService.demandConfig$.subscribe((demandConfig) => {
        this.demandNavigationConfig = demandConfig;
      })
    );
  }

  private _getCurrentDemand(): void {
    this._subscription$.add(
      this._demandNavigationService.currentDemand$.subscribe(
        (currentDemand) => {
          const convertedDemand =
            this._demandConverter.convertToFormData(currentDemand);
            console.log('CONVERTED FORM IS : ', convertedDemand);
          this.form.patchValue(convertedDemand);
          this.files = currentDemand.Files;
        }
      )
    );
  }
}
