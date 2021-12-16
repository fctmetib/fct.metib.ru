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
      case DemandAction.AGENT_FACTORING:
        return this._converterToAPI.convertFactoringToApiData(dataForm, files);
      case DemandAction.SURETY:
        return this._converterToAPI.convertSuretyToApiData(dataForm, files);
      case DemandAction.EDIT_PROFILE:
        return this._converterToAPI.convertProfileToApiData(dataForm, files);
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
      case DemandAction.AGENT_FACTORING:
        return this._converterToForm.convertAgentFactoringToFormData(
          dataFromAPI
        );
      case DemandAction.SURETY:
        return this._converterToForm.convertSuretyToFormData(dataFromAPI);
      case DemandAction.EDIT_PROFILE:
        return this._converterToForm.convertProfileToFormData(dataFromAPI);
    }
  }
}
