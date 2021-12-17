import { CryptoService } from 'src/app/shared/services/common/crypto.service';
import { DemandValuesIniter } from '../../tools/demand-values-initer';
import { FileModeInterface } from 'src/app/shared/types/file/file-model.interface';
import { DemandConverter } from '../../tools/demand-converter';
import { DoDemandPageActionType } from '../../types/navigation-service/do-demand-page-action-type';
import { FormGenerator } from '../../tools/form-generator';
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
import { BankInterface } from 'src/app/shared/types/common/bank.interface';
import { MIBCommon } from 'src/app/shared/classes/common/mid-common.class';
import { CookieService } from 'ngx-cookie';
import { DebtorInterface } from '../../types/debtor-interface';

@Component({
  selector: 'debitor',
  styleUrls: ['./debitor.component.scss'],
  templateUrl: 'debitor.component.html',
})
export class DebitorComponent implements OnInit {
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
  private _formGenerator: FormGenerator;

  private currentUserId: string;
  private avatarCode: string;

  // Файлы
  public files: FileModeInterface[] = [];

  //#region Debtor
  public debtors: DebtorInterface[] = [];
  isRequestLoading: boolean = false; // this was an Input Property
  public isNewDebtor: boolean = false;
  //#endregion

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private _demandLoadingService: DemandLoadingService,
    private _demandNavigationService: DemandNavigationService,
    private cryptoService: CryptoService,
    private cookieService: CookieService
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

  public onSubmit() {
    this._doDemandAction(DoDemandPageActionType.CREATE);
  }

  public debtorChange() {
    let selectedDebtor = this.debtors.find((x) => x.ID === this.form.value.Id);
    if (!selectedDebtor) {
      this.isNewDebtor = true;
    } else {
      this.isNewDebtor = false;
    }
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

    if (crtInds.includes('Passport')) {
      isInvalid = false;
    } else {
      isInvalid = true;
    }

    return isInvalid;
  }

  private _doDemandAction(type: DoDemandPageActionType): void {
    const formValue = {
      ...this.form.getRawValue(),
      currentUserId: this.currentUserId,
      avatarCode: this.avatarCode,
    };

    const convertedForm = this._demandConverter.convertToApiData(
      this.demandNavigationConfig.demandAction,
      formValue,
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
    this.form = this._formGenerator.generateDebitorForm();
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
          const convertedDemand: any =
            this._demandConverter.convertToFormData(currentDemand);

          this.form.patchValue(convertedDemand);

          this.avatarCode = currentDemand?.Avatar;
          this.files = currentDemand.Files;
        }
      )
    );
  }
}
