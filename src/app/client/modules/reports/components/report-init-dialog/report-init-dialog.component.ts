import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ControlConfigInterface } from '../../types/common/control-config.interface';

@Component({
  selector: 'app-report-init-dialog',
  templateUrl: './report-init-dialog.component.html',
  styleUrls: ['./report-init-dialog.component.scss'],
})
export class ReportInitDialogComponent {

  public controlConfig: ControlConfigInterface;

  constructor(
    public config: DynamicDialogConfig,
    public store: Store
  ) {}

  ngOnInit() {
    this.initControlConfig();
    this.initForm();
  }

  public onSubmit(): void {}

  private initControlConfig(): void {

  }

  private initForm(): void {

  }
}
