import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MibModalService } from '../../shared/mib-modal';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public financeForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    inn: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    isAccept: false,
  });

  constructor(
    private mibModalService: MibModalService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {}

  public isFinanceFormValid(): boolean {
    if (this.financeForm.value.isAccept && this.financeForm.valid) {
      return true;
    } else {
      return false;
    }
  }

  public sendFinanceRequest() {}

  openModal(id: string) {
    this.mibModalService.open(id);
  }

  closeModal(id: string) {
    this.mibModalService.close(id);
  }
}
