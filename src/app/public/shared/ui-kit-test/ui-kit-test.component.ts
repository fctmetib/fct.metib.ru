import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MibModalService } from '../mib-modal';

@Component({
  selector: 'ui-kit-test',
  styleUrls: ['./ui-kit-test.component.scss'],
  templateUrl: 'ui-kit-test.component.html',
})
export class UIKitTestComponent implements OnInit {
  private buttonMessageOne = 0;

  constructor(
    private readonly mibModalService: MibModalService,
    private readonly fb: FormBuilder
  ) { }

  public ngOnInit(): void { }

  form = this.fb.group({
    name: ["", Validators.required],
    phone: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
  });

  // Buttons
  public incrementButton(type: number) {
    switch (type) {
      case 1:
        this.buttonMessageOne++;
        break;
    }
  }

  public openModal(id: string): void {
    this.mibModalService.open(id);
  }

  public closeModal(id: string): void {
    this.mibModalService.close(id);
  }

  public submit(): void { }
}
