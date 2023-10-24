// Core & System
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
// Interfaces & Types
import { FileModeInterface } from 'src/app/shared/types/file/file-model.interface';
import { DoDemandActionInterface } from '../../types/navigation-service/do-demand-action.interface';
import { DemandNavigationInterface } from '../../types/common/demand-navigation.interface';
import { DemandActionType } from '../../types/common/demand-action-type';
import { DoDemandPageActionType } from '../../types/navigation-service/do-demand-page-action-type';
// Services
import { DemandNavigationService } from '../../services/demand-navigation.service';
import { DemandLoadingService } from '../../services/demand-loading.service';
// Tools
import { DemandConverter } from '../../tools/demand-converter';
import { FormGenerator } from '../../tools/form-generator';
@Component({
  selector: 'limit',
  styleUrls: ['./limit.component.scss'],
  templateUrl: 'limit.component.html',
})
export class LimitComponent implements OnInit {
  // Форма
  public form: FormGroup;

  // Системные переменные
  public requestLoading$: Observable<boolean>;
  public demandNavigationConfig: DemandNavigationInterface;

  private _subscription$: Subscription = new Subscription();
  private _demandConverter: DemandConverter;
  private _formGenerator: FormGenerator;

  // Файлы
  public files: FileModeInterface[] = [];

  constructor(
    private fb: FormBuilder,
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

  //#region Код текущего запроса
  // Регион в котором содержится код только для текущего запроса

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
  private _initAdditionalData(): void {}

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
    this.form = this._formGenerator.generateLimitForm();
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

          this.files = currentDemand.Files;
        }
      )
    );
  }
  //#endregion
}
