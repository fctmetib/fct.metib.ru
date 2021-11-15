// System
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  public demandNavigationConfig: DemandNavigationInterface;
  private _subscription$: Subscription = new Subscription();

  // UI
  public selectedIdCenter: any;

  // Файлы
  public files: FileModeInterface[] = [];

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private _demandNavigationService: DemandNavigationService
  ) {}

  ngOnInit() {
    this._initForm();
    this._initAdditionalData();
    this._getDemandConfig();
    this._getCurrentDemand();
  }

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }

  // TODO:: ADD METHODS LOGIC
  public onSubmit() {}

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
    if (this.demandNavigationConfig.demandActionType === DemandActionType.EDIT_CREATED) {
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
      this._demandNavigationService.currentDemand$.subscribe((currentDemand) => {
        console.log('Current Demand: ', currentDemand);
      })
    );
  }
}
