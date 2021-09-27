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
    let organizationInterface: OrganizationInterface = this.financeForm.value;
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
