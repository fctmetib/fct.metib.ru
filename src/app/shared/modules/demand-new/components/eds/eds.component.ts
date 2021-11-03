// System
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

@Component({
  selector: 'eds',
  styleUrls: ['./eds.component.scss'],
  templateUrl: './eds.component.html',
})
export class EDSComponent implements OnInit, OnDestroy {
  // Форма
  public form: FormGroup;

  // Данные, для выпадающих список
  public organizationTypes: DemandSelectboxInterface[] = DemandValuesIniter.organizationTypes;
  public ruleTypes: DemandSelectboxInterface[] = DemandValuesIniter.ruleTypes;
  public genderTypes: DemandSelectboxInterface[] = DemandValuesIniter.genderTypes;
  public postList: PostInterface[] = [];
  public countryList: RegionInterface[] = [];
  public regionList: RegionInterface[] = [];
  public idCenterList: any[] = [];

  // Системные переменные
  private subscription$: Subscription = new Subscription();

  // OLD
  public isEdit: boolean = false;
  public files: any[];
  public selectedIdCenter: any;

  constructor(private fb: FormBuilder, private commonService: CommonService) {}

  ngOnInit() {
    this._initForm();
    this._initAdditionalData();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  public onSubmit() {}

  // OLD
  isFilesInvalid() {}
  getDigitalSignatureRequest() {}
  onRemove(event) {}
  onAdd(event) {}
  selectGeoPosition(event) {}
  setIDCenter(event) {}

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
    this.form = formGenerator.generateEDSForm();
  }

  private _initAdditionalData(): void {
    this.subscription$.add(
      this.commonService.getPosts().subscribe((posts) => {
        this.postList = posts;
      })
    );
    this.subscription$.add(
      this.commonService.getCountries().subscribe((countries) => {
        this.countryList = countries;
      })
    );
    this.subscription$.add(
      this.commonService.getRegions().subscribe((regions) => {
        this.regionList = regions;
      })
    );
  }
}
