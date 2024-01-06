import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DrawerData} from '../../../../../shared/ui-kit/drawer/interfaces/drawer.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormsPresetsService} from '../../../../../shared/services/forms-presets.service';
import {Shipment} from './interfaces/shipment.interface';
import {ToolsService} from '../../../../../shared/services/tools.service';
import {RequestRes} from '../../interfaces/request.interface';

@Component({
  selector: 'mib-delivery-agreement-drawer',
  templateUrl: './shipment-drawer.component.html',
  styleUrls: ['./shipment-drawer.component.scss']
})
export class ShipmentDrawerComponent implements OnInit {

  public form: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DrawerData<RequestRes[]>,
    public dialogRef: MatDialogRef<ShipmentDrawerComponent>,
    private fb: FormBuilder,
    private formsPresetsService: FormsPresetsService,
    private toolsService: ToolsService
  ) {
  }

  ngOnInit() {
    this.initForm()
  }

  private initForm() {
    this.form = this.formsPresetsService.shipment(Validators.required)
  }

  onSubmit() {
    const form: Shipment = this.toolsService.transformDatesToISO(this.form.getRawValue())
    this.dialogRef.close(form)
  }
}
