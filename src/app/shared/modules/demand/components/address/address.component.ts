import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MIBCommon } from 'src/app/shared/classes/common/mid-common.class';
import { DemandSelectboxInterface } from '../../types/common/demand-selectbox.interface';

@Component({
  selector: 'address-modal',
  template: `
    <div>
      <form [formGroup]="formAddress" (ngSubmit)="saveAddress()">
        <div class="p-field">
          <label for="PostCode">Почтовый Индекс: </label>
          <input
            id="PostCode"
            type="text"
            pInputText
            placeholder="Почтовый Индекс"
            formControlName="PostCode"
          />
        </div>
        <div class="p-field">
          <label for="Country">Страна: </label>
          <p-dropdown
            id="Country"
            [options]="countryList"
            placeholder="Страна"
            formControlName="Country"
            optionLabel="title"
            optionValue="value"
          ></p-dropdown>
        </div>
        <div class="p-field">
          <label for="RegionCode">Код региона: </label>
          <p-dropdown
            id="RegionCode"
            [options]="regionList"
            placeholder="Код региона"
            (onChange)="onRegionChanged($event.value)"
            formControlName="RegionCode"
            optionLabel="title"
            optionValue="value"
          ></p-dropdown>
        </div>
        <div class="p-field">
          <label for="District">Район: </label>
          <input
            id="District"
            type="text"
            pInputText
            placeholder="Район"
            formControlName="District"
          />
        </div>
        <div class="p-field">
          <label for="City">Город: </label>
          <input
            id="City"
            type="text"
            pInputText
            placeholder="Город"
            formControlName="City"
          />
        </div>
        <div class="p-field">
          <label for="Locality">Населенный пункт: </label>
          <input
            id="Locality"
            type="text"
            pInputText
            placeholder="Населенный пункт"
            formControlName="Locality"
          />
        </div>
        <div class="p-field">
          <label for="Street">Улица: </label>
          <input
            id="Street"
            type="text"
            pInputText
            placeholder="Улица"
            formControlName="Street"
          />
        </div>
        <div class="p-field">
          <label for="House">Дом: </label>
          <input
            id="House"
            type="text"
            pInputText
            placeholder="Дом"
            formControlName="House"
          />
        </div>
        <div class="p-field">
          <label for="Appartment">Офис / Квартира: </label>
          <input
            id="Appartment"
            type="text"
            pInputText
            placeholder="Офис / Квартира"
            formControlName="Appartment"
          />
        </div>
        <div class="modal-actions">
          <button
            pButton
            pRipple
            label="Применить"
            class="p-button-text save"
            type="submit"
          ></button>
          <button
            pButton
            pRipple
            label="Отменить"
            class="p-button-text cancel"
            (click)="closeModal()"
            type="button"
          ></button>
        </div>
      </form>
    </div>
  `,
})
export class AddressModalComponent implements OnInit {
  public countryList: DemandSelectboxInterface[];
  public regionList: DemandSelectboxInterface[];
  public formAddress: FormGroup;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    let mibCommon = new MIBCommon();
    this.countryList = mibCommon.getCountryList();
    this.regionList = mibCommon.getRegionList();

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

    const address = this.config.data.address;
    console.log('IN MODAL', this.config.data.address)
    if (address) {
      this.formAddress.patchValue(address);
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

  saveAddress() {
    this.ref.close(this.formAddress.value);
  }

  public closeModal() {
    this.ref.close();
  }
}
