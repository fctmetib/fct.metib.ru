// Core & System
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
// Interfaces & Types
import { DemandNavigationInterface } from '../../types/common/demand-navigation.interface';
import { DoDemandPageActionType } from '../../types/navigation-service/do-demand-page-action-type';
import { DoDemandActionInterface } from '../../types/navigation-service/do-demand-action.interface';
import { DemandActionType } from '../../types/common/demand-action-type';
// Services
import { DemandNavigationService } from '../../services/demand-navigation.service';
import { DemandLoadingService } from '../../services/demand-loading.service';
import { DeliveryService } from 'src/app/shared/services/share/delivery.service';
// Tools
import { MibArray } from 'src/app/shared/classes/arrays/mib-array.class';
import { DemandConverter } from '../../tools/demand-converter';
import { FormGenerator } from '../../tools/form-generator';
@Component({
  selector: 'verify',
  styleUrls: ['./verify.component.scss'],
  templateUrl: 'verify.component.html',
})
export class VerifyComponent implements OnInit {
  // Форма
  public form: FormGroup;

  // Системные переменные
  public requestLoading$: Observable<boolean>;
  public demandNavigationConfig: DemandNavigationInterface;

  private _subscription$: Subscription = new Subscription();
  private _demandConverter: DemandConverter;
  private _formGenerator: FormGenerator;

  //#region Verify Request
  public debtorList: any[] = [];
  public verificationTypes: any[] = [];
  public currentTemplate: string = 'ediTemplate';
  //#endregion

  constructor(
    private fb: FormBuilder,
    private _demandLoadingService: DemandLoadingService,
    private _demandNavigationService: DemandNavigationService,
    private _deliveryService: DeliveryService
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

  //#region Код текущего запроса
  // Регион в котором содержится код только для текущего запроса
  public changeVerificationType(event): void {
    this.form.patchValue({
      DocumentTypeTorg12: false,
      DocumentTypeInvoice: false,
      DocumentTypeAcceptance: false,
      DocumentTypeNonformalized: false,
      DocumentTypeORDER: false,
      DocumentTypeRECADV: false,
    });

    switch (event.value) {
      case 'EDOKontur':
        this.currentTemplate = 'edoTemplate';
        break;
      case 'Other':
        this.currentTemplate = 'anotherTemplate';
        break;
      default:
        this.currentTemplate = 'ediTemplate';
        break;
    }
  }

  //#endregion

  //#region Boilerplate код для запросов
  // Регион в котором содержится шаблонный код для всех запросов

  /**
   * Обработчик кнопки submit
   * Используется на всех страницах запроса
   */
  public onSubmit(): void {
    this._doDemandAction(DoDemandPageActionType.CREATE);
  }

  /**
   * Предоставляет для UI enum типов события (редактирование, создание и тд)
   * Во всех запросах код повторяется
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
    const formValue = {
      ...this.form.getRawValue(),
    };

    const convertedForm = this._demandConverter.convertToApiData(
      this.demandNavigationConfig.demandAction,
      formValue,
      []
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
    // Только verify
    this.verificationTypes = [
      {
        name: 'EDI Корус',
        value: 'EDIKorus',
      },
      {
        name: 'EDI CISLINK (Сислинк)',
        value: 'EDICislink',
      },
      {
        name: 'EDI Exite',
        value: 'EDIExite',
      },
      {
        name: 'ЭДО Контур Диадок',
        value: 'EDOKontur',
      },
      {
        name: 'Другой источник',
        value: 'Other',
      },
    ];

    this._subscription$.add(
      this._deliveryService.getDeliveriesWithStats().subscribe((deliveries) => {
        let debtors = deliveries.map((delivery) => delivery.Debtor);
        let uniqDebtors = MibArray.getUniqByProperty(debtors, 'Title');
        this.debtorList.push(...uniqDebtors);

        this.form.patchValue({
          VerificationType: 'EDIKorus',
          DebtorID: this.debtorList[0].ID,
        });
      })
    );

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
    // Метод для инициализации дополнительных данных
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
    this.form = this._formGenerator.generateVerifyForm();
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
        }
      )
    );
  }
  //#endregion
}
