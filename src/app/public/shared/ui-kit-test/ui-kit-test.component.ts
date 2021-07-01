import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MibModalService } from '../mib-modal';

@Component({
  selector: 'ui-kit-test',
  styleUrls: ['./ui-kit-test.component.scss'],
  templateUrl: 'ui-kit-test.component.html',
})
export class UIKitTestComponent implements OnInit {
  constructor(private mibModalService: MibModalService, private fb: FormBuilder) {}

  ngOnInit() {}

  form = this.fb.group({
    name: ["", Validators.required],
    phone: ["", Validators.required],
    email: ["", Validators.required],
  });

  // Buttons
  public buttonMessageOne = 0;
  public incrementButton(type: number) {
    switch (type) {
      case 1:
        this.buttonMessageOne++;
        break;
    }
  }

  openModal(id: string) {
    this.mibModalService.open(id);
  }

  closeModal(id: string) {
    this.mibModalService.close(id);
  }

  submit() {

  }
}
