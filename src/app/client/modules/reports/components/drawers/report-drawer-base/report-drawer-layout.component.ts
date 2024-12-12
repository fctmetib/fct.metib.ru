import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DrawerModule } from '../../../../../../shared/ui-kit/drawer/drawer.module';
import { ButtonModule } from '../../../../../../shared/ui-kit/button/button.module';
import { IReportCard } from '../../../../cabinet/types/common/i-report.card';
import { SpacingModule } from '../../../../../../shared/ui-kit/spacing/spacing.module';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'mib-report-drawer-layout',
  standalone: true,
  imports: [
    CommonModule,
    DrawerModule,
    ButtonModule,
    MatDialogModule,
    SpacingModule
  ],

  templateUrl: './report-drawer-layout.component.html',
  styleUrls: ['./report-drawer-layout.component.scss']
})
export class ReportDrawerLayoutComponent {

  @Input() loading: boolean = false;

  @Output() onReport = new EventEmitter()
  @Output() onClose = new EventEmitter()

  dialogRef = inject(MatDialogRef<ReportDrawerLayoutComponent>)
  controlContainer = inject(ControlContainer, {optional: true, self: true})
  data?: IReportCard = inject(MAT_DIALOG_DATA, {optional: true})

  get disabled() {
    return (this.controlContainer as FormGroupDirective)?.form?.invalid || false;
  }

  handleReport() {
    this.onReport.emit()
  }

  handleClose() {
    this.onClose.emit()
    this.dialogRef.close()
  }
}
