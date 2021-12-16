import { FormControl, FormGroup } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddressModalComponent } from '../address/address.component';

@Component({
  selector: 'demand-address-group',
  styleUrls: ['./address-group.component.scss'],
  template: `
    <ng-container [formGroup]="addressGroup">
      <div class="p-field">
        <label>{{ title }}</label>
        <div class="addon-button p-mb-2">
          <div class="action-box">
            <input
              type="text"
              pInputText
              placeholder="{{ placeholder }}"
              formControlName="displayAddress"
            />
            <button
              pButton
              pRipple
              type="button"
              label="Изменить"
              class="p-button-outlined small"
              (click)="openAddressForm()"
            ></button>
          </div>
        </div>
      </div>
    </ng-container>
  `,
})
export class DemandAddressGroupComponent implements OnInit {
  @Input()
  addressGroup: FormGroup;

  @Input()
  title: string;

  @Input()
  placeholder: string;

  @Input()
  isOnChangeRequired: boolean;

  @Output()
  onChange = new EventEmitter<any>();

  private ref: DynamicDialogRef;

  constructor(public dialogService: DialogService) {}

  ngOnInit() {
    this._updateDisplayAddress();
  }

  public openAddressForm() {
    let addresses = this.addressGroup.value;
    let address = addresses.factoringPlacesAddress;

    this.ref = this.dialogService.open(AddressModalComponent, {
      header: 'Укажите Адрес',
      width: '650px',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      styleClass: 'p-fluid',
      data: {
        address,
      },
    });

    this.ref.onClose.subscribe((data: any) => {
      if (data) {
        this.addressGroup.value.factoringPlacesAddress = data;
        this._updateDisplayAddress();
        if (this.isOnChangeRequired) {
          this.onChange.emit(data);
        }
      }
    });
  }

  private _updateDisplayAddress(): void {
    let address = this.addressGroup.value.factoringPlacesAddress;
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

    this.addressGroup.patchValue({
      displayAddress: result,
      factoringPlacesAddress: address,
    });
  }
}
