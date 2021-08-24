import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OrganizationService } from '../../service/organization.service';
import { MibModalService } from '../../shared/mib-modal';
import { Subscription } from 'rxjs';
import { OrganizationInterface } from '../../type/organization.interface';

@Component({
  selector: 'tariffs',
  styleUrls: ['./tariffs.component.scss'],
  templateUrl: './tariffs.component.html',
})
export class TariffsComponent implements OnInit, OnDestroy {
  private subscription$: Subscription = new Subscription();

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
    let organizationInterface: OrganizationInterface = this.financeForm.value;
    this.subscription$.add(
      this.organizationService
        .send(organizationInterface)
        .subscribe((response) => {
          this.closeModal(id);
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
    this.openModal('get-finance');
  }

  openModal(id: string) {
    this.mibModalService.open(id);
  }

  closeModal(id: string) {
    this.mibModalService.close(id);
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
