// Core & System
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
// Interfaces & Types
import { DemandNavigationInterface } from '../../types/common/demand-navigation.interface';
import { DemandSelectboxInterface } from '../../types/demand-selectbox.interface';
import { BankInterface } from 'src/app/shared/types/common/bank.interface';
import { DoDemandActionInterface } from '../../types/navigation-service/do-demand-action.interface';
import { DemandActionType } from '../../types/common/demand-action-type';
import { MIBCommon } from 'src/app/shared/classes/common/mid-common.class';
import { DoDemandPageActionType } from '../../types/navigation-service/do-demand-page-action-type';
import { FileMode } from 'src/app/shared/types/file/file-model.interface';
// Services
import {
  CommonService,
  PostInterface,
  RegionInterface,
} from 'src/app/shared/services/common/common.service';
import { DemandNavigationService } from '../../services/demand-navigation.service';
import { DemandLoadingService } from '../../services/demand-loading.service';
// Tools
import { FormGenerator } from '../../tools/form-generator';
import { DemandConverter } from '../../tools/demand-converter';
import { DemandValuesIniter } from '../../tools/demand-values-initer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'agent-factoring',
  styleUrls: ['./agent-factoring.component.scss'],
  templateUrl: 'agent-factoring.component.html',
})
export class AgentFactoringComponent implements OnInit {
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
  public validations: Array<string> = environment.uploadFilesExt;

  // Системные переменные
  public requestLoading$: Observable<boolean>;
  public demandNavigationConfig: DemandNavigationInterface;

  private _subscription$: Subscription = new Subscription();
  private _demandConverter: DemandConverter;
  private _formGenerator: FormGenerator;

  // UI
  public selectedIdCenter: any;

  // Файлы
  public files: FileMode[] = [];

  //#region Agent Factoring Request
  public resultsBIK: string[];
  public resultsBankname: string[];
  public typesOfOwner: DemandSelectboxInterface[] = [];
  isRequestLoading: boolean = false; // this was an Input Property
  public banksFounded: BankInterface[];
  //#endregion

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private _demandLoadingService: DemandLoadingService,
    private _demandNavigationService: DemandNavigationService
  ) {
    this._demandConverter = new DemandConverter();
    this._formGenerator = new FormGenerator(this.fb);
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

  //#region Factoring Request
  // Регион в котором содержится код только для текущего запроса
  public search(event): void {
    this._subscription$.add(
      this.commonService.getBankByBIK(event.query).subscribe((data) => {
        this.banksFounded = data;
        this.resultsBIK = data.map((result) => result.BIC);
      })
    );
  }

  public onOtherBankSelect(indexOtherBank: number, bankInfo: string) {
    let bank = this.banksFounded.find(
      (x) => x.BIC === bankInfo || x.Name === bankInfo
    );
    this.form.get('otherBanks')['controls'][indexOtherBank].patchValue({
      otherBankName: bank.Name,
    });
  }

  public onBankSelect(bankInfo: string) {
    let bank = this.banksFounded.find(
      (x) => x.BIC === bankInfo || x.Name === bankInfo
    );
    this.form.patchValue({
      bankBik: bank.BIC,
      bankCorrespondentAccount: bank.AccountBank,
      bankName: bank.Name,
    });
  }

  public searchByBankName(event): void {
    this._subscription$.add(
      this.commonService.getBankByName(event.query).subscribe((data) => {
        this.banksFounded = data;
        this.resultsBankname = data.map((result) => result.Name);
      })
    );
  }

  public addOtherBank(): void {
    let otherBanks = this.form.get('otherBanks') as FormArray;
    otherBanks.push(this._formGenerator.generateBankForm());
  }

  public addOtherPlace(): void {
    let factoringPlaces = this.form.get('factoringPlaces') as FormArray;
    factoringPlaces.push(this._formGenerator.generateFactoringPlaceForm());
    this._updateDisplayAddress(factoringPlaces.length - 1);
  }

  public getFactoringPlaces(index): FormGroup {
    let factoringPlaces = this.form.get('factoringPlaces') as FormArray;
    return factoringPlaces.controls[index] as FormGroup;
  }

  public addFactoringCredits(): void {
    let factoringCredits = this.form.get('factoringCredits') as FormArray;
    factoringCredits.push(this._formGenerator.generateFactorCreditGroup());
  }

  public addEDIProvider(): void {
    let factoringEDIProviders = this.form.get(
      'factoringEDIProviders'
    ) as FormArray;
    factoringEDIProviders.push(this._formGenerator.generateEDIFormGroup());
  }

  public remove(i: number, type: string): void {
    let other = this.form.get(type) as FormArray;
    other.removeAt(i);
  }

  onTypeChanged(value) {
    if (value === 0) {
      this.form.patchValue({
        organizationLegalForm: null,
      });
    }
  }

  private _updateDisplayAddress(index): void {
    let address = this.form.value.factoringPlaces[index].factoringPlacesAddress;
    let result = '';

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

    (<FormArray>this.form.controls['factoringPlaces']).at(index).patchValue({
      displayAddress: result,
      factoringPlacesAddress: address,
    });
  }

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
      crtInds.includes('Regulations') &&
      crtInds.includes('GenDirPassport') &&
      crtInds.includes('GenDirProtocol') &&
      crtInds.includes('GenDirOrder') &&
      crtInds.includes('Balance') &&
      crtInds.includes('OSV') &&
      crtInds.includes('Shareholders') &&
      crtInds.includes('ContractDelivery')
    ) {
      isInvalid = false;
    } else {
      isInvalid = true;
    }

    return isInvalid;
  }

  //#endregion

  //#region Boilerplate код для запросов
  // Регион в котором содержится шаблонный код для всех запросов

  /**
   * Обработчик кнопки submit
   * Используется на всех страницах запроса
   */
  public onSubmit() {
    this._doDemandAction(DoDemandPageActionType.CREATE);
  }

  /**
   * Предоставляет для UI enum типов события (редактирование, создание и тд)
   * @returns enum с типами
   */
  public get demandActionType(): typeof DemandActionType {
    return DemandActionType;
  }

  /**
   * Метод для выполнения действий, которые инициируются из состояния, или нажатия на кнопку
   * Во всех запросах код повторяется
   */
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

  /**
   * Метод для инициализации основных значений
   * Почти во всех запросах код повторяется
   */
  private _initValues() {
    // Только factoring
    let mibCommon = new MIBCommon();

    this.organizationTypes = mibCommon.getOrganizations();
    this.ruleTypes = mibCommon.getLegalForms();
    this.typesOfOwner = mibCommon.getTypesOfOwner();
    // -----

    this.requestLoading$ = this._demandLoadingService.demandRequestLoading$;

    this._subscription$.add(
      this._demandNavigationService.doDemandSave$.subscribe((saveAction) => {
        this._doDemandAction(DoDemandPageActionType.SAVE_DRAFT);
      })
    );
  }

  /**
   * Метод для инициализации дополнительых данных
   * Во всех запросах код повторяется
   */
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

  /**
   * Получает текущий Demand Config, в котором содержатся основные параметры текущего запроса (demand-а)
   * Во всех запросах код повторяется
   */
  private _getDemandConfig(): void {
    this._subscription$.add(
      this._demandNavigationService.demandConfig$.subscribe((demandConfig) => {
        this.demandNavigationConfig = demandConfig;
      })
    );
  }

  /**
   * Метод для генерации формы
   * В запросах код разный
   */
  private _initForm() {
    this.form = this._formGenerator.generateAgentFactoringForm();
  }

  /**
   * Получает текущий Demand по подписке из контейнера demand-action
   * Конвертирует полученный Demand в данные для формы и заполняет форму
   * В запросах код разный
   */
  private _getCurrentDemand(): void {
    this._subscription$.add(
      this._demandNavigationService.currentDemand$.subscribe(
        (currentDemand) => {
          const convertedDemand: any =
            this._demandConverter.convertToFormData(currentDemand);

          this.form.patchValue(convertedDemand);

          // получаем Form Arrays
          let factoringCredits = this.form.get('factoringCredits') as FormArray;
          let factoringPlaces = this.form.get('factoringPlaces') as FormArray;
          let otherBanks = this.form.get('otherBanks') as FormArray;

          // заполняем Form Arrays
          const credits = convertedDemand.factoringCredits;
          const places = convertedDemand.factoringPlaces;
          const banks = convertedDemand.otherBanks;

          credits.forEach((credit) => {
            factoringCredits.push(
              this._formGenerator.generateFactorCreditGroup(credit)
            );
          });

          places.forEach((place) => {
            factoringPlaces.push(
              this._formGenerator.generateFactoringPlaceForm(place)
            );
          });

          banks.forEach((bank) => {
            otherBanks.push(this._formGenerator.generateBankForm(bank));
          });

          this.files = currentDemand.Files;
        }
      )
    );
  }
}
