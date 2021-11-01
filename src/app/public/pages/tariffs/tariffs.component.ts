import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OrganizationService } from '../../service/organization.service';
import { MibModalService } from '../../shared/mib-modal';
import { Subscription } from 'rxjs';
import { OrganizationInterface } from '../../type/organization.interface';
import { Defender } from 'src/app/shared/classes/common/defender.class';

@Component({
  selector: 'tariffs',
  styleUrls: ['./tariffs.component.scss'],
  templateUrl: './tariffs.component.html',
})
export class TariffsComponent implements OnInit, OnDestroy {
  private subscription$: Subscription = new Subscription();

  public isRequestLoading: boolean = false;

  public display: boolean = false;
  public financeForm = this.fb.group({
    organization: ['', Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required],
    inn: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    comment: [''],
    isAccept: false,
  });

  constructor(
    private mibModalService: MibModalService,
    private fb: FormBuilder,
    private organizationService: OrganizationService
  ) {}

  ngOnInit() {}

  public sendFinanceRequest(id: string) {
    if (!this.isFinanceFormValid() || this.isRequestLoading) {
      return;
    }

    this.isRequestLoading = true;

    let organizationInterface: OrganizationInterface =  {
      Comment: Defender.defendValue(this.financeForm.value?.comment),
      Email:  Defender.defendValue(this.financeForm.value?.email),
      Inn:  Defender.defendValue(this.financeForm.value?.inn),
      IsAccept: this.financeForm.value?.isAccept,
      Organization:  Defender.defendValue(this.financeForm.value?.organization),
      Person:  Defender.defendValue(this.financeForm.value?.name),
      Phone: Defender.defendValue(this.financeForm.value?.phone)
    }

    this.subscription$.add(
      this.organizationService
        .send(organizationInterface)
        .subscribe((response) => {
          this.display = false;
          this.financeForm.reset();
        })
    );
  }

  public isFinanceFormValid(): boolean {
    if (this.financeForm.value.isAccept && this.financeForm.valid) {
      return true;
    } else {
      return false;
    }
  }

  public onConsultationHandler() {
    this.financeForm.reset();
    this.display = true;
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
