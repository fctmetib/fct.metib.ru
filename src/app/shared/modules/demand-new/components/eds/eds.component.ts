import { Observable } from 'rxjs';
// System
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
// Interfaces
import { DemandSelectboxInterface } from '../../types/demand-selectbox.interface';
// Common Logic / Classes / Tools
import { DemandValuesIniter } from '../../tools/demand-values-initer';
import { FormGenerator } from '../../tools/form-generator';
// Services
import {
  CommonService,
  PostInterface,
  RegionInterface,
} from 'src/app/shared/services/common/common.service';
import { FileModeInterface } from 'src/app/shared/types/file/file-model.interface';
import { DemandNavigationService } from '../../services/demand-navigation.service';
import { DemandNavigationInterface } from '../../types/common/demand-navigation.interface';
import { DemandActionType } from '../../types/common/demand-action-type';
import { DemandConverter } from '../../tools/demand-converter';
import { SaveDemandRequestInterface } from '../../types/requests/save-demand-request.interface';
import { DoDemandActionInterface } from '../../types/navigation-service/do-demand-action.interface';
import { DemandLoadingService } from '../../services/demand-loading.service';
import { DoDemandPageActionType } from '../../types/navigation-service/do-demand-page-action-type';

@Component({
  selector: 'eds',
  styleUrls: ['./eds.component.scss'],
  templateUrl: './eds.component.html',
})
export class EDSComponent implements OnInit, OnDestroy {
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

  /**
   * Получает список центров выдачи от АПИ
   * @param event - принимает событие из dropdown
   * @returns void
   */
  public selectGeoPosition(event): void {
    this.commonService.getIdCenters(event.value).subscribe((response) => {
      this.idCenterList = response;
    });
  }

  /**
   * Задает выбранный центр выдачи, для отрисовки пользователю
   * @param event - принимает событие из dropdown
   * @returns void
   */
  public setIDCenter(event): void {
    this.selectedIdCenter = this.idCenterList.find(
      (x) => x.guid === event.value
    );
  }

  /**
   * Получает цифровую подпись, на основе введенных данных
   * @returns void
   */
  public getDigitalSignatureRequest(): void {
    // this.demandService
    //   .getDigitalSignatureRequest(this.prepareCoreData())
    //   .subscribe((resp) => {
    //     let binaryData = [];
    //     binaryData.push(resp);
    //     let downloadLink = document.createElement('a');
    //     downloadLink.href = window.URL.createObjectURL(
    //       new Blob(binaryData, { type: 'application/msword' })
    //     );
    //     downloadLink.setAttribute('download', 'Заявка на выдачу сертификата');
    //     document.body.appendChild(downloadLink);
    //     downloadLink.click();
    //   });
  }

  /**
   * Проверяет совпадение адресса, на основе типа и заполняет следующее поле, если есть совпадение
   * @param type - принимает тип из чекбокса на UI
   * @returns void
   */
  public isAddressEqual(type): void {
    if (type === 'organizationActualAddress') {
      let legalAddress =
        this.form.value.organizationLegalAddress.factoringPlacesAddress;
      let addressEdited = <FormControl>(
        this.form.controls['organizationActualAddress']
      );
      addressEdited.patchValue({
        factoringPlacesAddress: legalAddress,
      });
      this._updateDisplayAddress('organizationActualAddress');
    }
    if (type === 'organizationPostAddress') {
      let legalAddress =
        this.form.value.organizationLegalAddress.factoringPlacesAddress;
      let addressEdited = <FormControl>(
        this.form.controls['organizationPostAddress']
      );
      addressEdited.patchValue({
        factoringPlacesAddress: legalAddress,
      });
      this._updateDisplayAddress('organizationPostAddress');
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

    // Для всех форм при создании указывается DraftID = 0, если отстуствует иное значение
    const requestData: SaveDemandRequestInterface<any> = {
      DraftID: 0,
      Data: convertedForm,
    };

    const doActionData: DoDemandActionInterface = {
      data: requestData,
      type: type,
    };

    this._demandNavigationService.setDoDemandAction(doActionData);
  }

  private _initValues() {
    this.requestLoading$ = this._demandLoadingService.demandRequestLoading$;

    this._subscription$.add(
      this._demandNavigationService.doDemandSave$.subscribe(saveAction => {
        this._doDemandAction(DoDemandPageActionType.SAVE_DRAFT);
      })
    );
  }

  private _initForm() {
    const formGenerator = new FormGenerator(this.fb);
    this.form = formGenerator.generateEDSForm();
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

  private _updateDisplayAddress(type): void {
    let address = this.form.value[type].factoringPlacesAddress;
    let result = '';

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

    let addressEdited = <FormControl>this.form.controls[type];
    addressEdited.patchValue({
      displayAddress: result,
      factoringPlacesAddress: address,
    });
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
          this.form.patchValue(convertedDemand);
          this.files = currentDemand.Files;
        }
      )
    );
  }
}
