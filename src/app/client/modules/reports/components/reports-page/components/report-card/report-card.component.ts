import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../../../../../../../shared/ui-kit/button/button.module';
import { IconModule } from '../../../../../../../shared/ui-kit/ref-icon/icon.module';

@Component({
  selector: 'mib-report-card',
  standalone: true,
  imports: [CommonModule, ButtonModule, IconModule],
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss']
})
export class ReportCardComponent {
  @Input() title: string = 'Без названия'
  @Input() description: string = 'Без текста'
  @HostBinding('class.underlined')
  @Input() underlined: boolean = false;

  @Output() onReport = new EventEmitter()

  report() {
    this.onReport.emit()
  }
}
