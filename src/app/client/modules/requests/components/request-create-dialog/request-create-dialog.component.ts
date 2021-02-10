import { ClientRequestInterface } from './../../../../../shared/types/client/client-request.interface';
import { RequestsService } from './../../services/requests.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { RequestTypeEnum } from 'src/app/shared/types/enums/request-type.enum';
import { RequestSourceEnum } from 'src/app/shared/types/enums/request-source.enum';

@Component({
  selector: 'app-request-create-dialog',
  templateUrl: './request-create-dialog.component.html',
  styleUrls: ['./request-create-dialog.component.scss'],
})
export class RequestCreateDialogComponent {
  form: FormGroup;

  constructor(
    public ref: DynamicDialogRef,
    private fb: FormBuilder,
    private service: RequestsService,
    public config: DynamicDialogConfig) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    const request: ClientRequestInterface = {
      AgencyFlag: false,
      Date: new Date,
      DeliveryID: 1,
      Files: [],
      Number: '',
      Shipments: [],
      Source: RequestSourceEnum.Cabinet,
      Title: '',
      Type: RequestTypeEnum.Correction
    };

    this.service.add(request);
  }

  close() {
      this.ref.close('Closed');
  }
}
