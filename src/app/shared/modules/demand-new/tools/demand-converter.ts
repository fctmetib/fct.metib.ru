import { DemandAction } from '../types/common/demand-action';
import { DemandConverterToAPI } from './demand-converter-to-api';
import { DemandConverterToForm } from './demand-converter-to-form';

export class DemandConverter {
  private _converterToForm: DemandConverterToForm;
  private _converterToAPI: DemandConverterToAPI;

  constructor() {
    this._converterToForm = new DemandConverterToForm();
    this._converterToAPI = new DemandConverterToAPI();
  }

  /**
   * Конвертирует данные из АПИ в данные, для формы
   * @param Принимает объект полученный от API
   * @returns Возвращает объект, в одном из возможных типов: DemandEDSDataInterface
   */
  public convertToApiData(type: DemandAction, dataForm: any, files) {
    switch (type) {
      case DemandAction.EDS:
        return this._converterToAPI.convertEDSToApiData(dataForm, files);
      case DemandAction.FACTORING:
        return this._converterToAPI.convertFactoringToApiData(dataForm, files);
    }
  }

  /**
   * Конвертирует данные из АПИ в данные, для формы
   * @param Принимает объект полученный от API
   * @returns Возвращает объект, в одном из возможных типов: DemandEDSDataInterface
   */
  public convertToFormData(dataFromAPI: any) {
    switch (dataFromAPI.Type) {
      case DemandAction.EDS:
        return this._converterToForm.convertEDSToFormData(dataFromAPI);
      case DemandAction.FACTORING:
        return this._converterToForm.convertFactoringToFormData(dataFromAPI);
    }
  }
}
