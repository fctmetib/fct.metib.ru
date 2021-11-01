import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormGenerator } from '../../tools/form-generator';

@Component({
  selector: 'eds',
  styleUrls: ['./eds.component.scss'],
  templateUrl: './eds.component.html',
})
export class EDSComponent implements OnInit {
  public formEDS: FormGroup;

  // OLD
  public isEdit: boolean = false;
  public files: any[];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this._initForm();
  }

  public onSubmit() {}

  // OLD
  isFilesInvalid() {}
  getDigitalSignatureRequest() {}
  onRemove(event) {}
  onAdd(event) {}
  selectGeoPosition(event) {}
  setIDCenter(event) {}
  openAddressForm(type) {
    let addresses = this.formEDS.value[type];
    let address = addresses.factoringPlacesAddress;

    // this.ref = this.dialogService.open(AddressModalComponent, {
    //   header: 'Укажите Адрес',
    //   width: '650px',
    //   contentStyle: { 'max-height': '500px', overflow: 'auto' },
    //   baseZIndex: 10000,
    //   styleClass: 'p-fluid',
    //   data: {
    //     address,
    //   },
    // });
  }

  public isAddressEqual(type) {
    // if (type === 'organizationActualAddress') {
    //   let legalAddress =
    //     this.formEDS.value.organizationLegalAddress.factoringPlacesAddress;
    //   let addressEdited = <FormControl>(
    //     this.formEDS.controls['organizationActualAddress']
    //   );
    //   addressEdited.patchValue({
    //     factoringPlacesAddress: legalAddress,
    //   });
    //   this.updateDisplayAddress('organizationActualAddress');
    // }
    // if (type === 'organizationPostAddress') {
    //   let legalAddress =
    //     this.formEDS.value.organizationLegalAddress.factoringPlacesAddress;
    //   let addressEdited = <FormControl>(
    //     this.formEDS.controls['organizationPostAddress']
    //   );
    //   addressEdited.patchValue({
    //     factoringPlacesAddress: legalAddress,
    //   });
    //   this.updateDisplayAddress('organizationPostAddress');
    // }
  }

  private _initForm() {
    const formGenerator = new FormGenerator(this.fb);
    this.formEDS = formGenerator.generateEDSForm();
  }
}
