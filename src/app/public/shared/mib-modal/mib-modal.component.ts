import {
  Component,
  ViewEncapsulation,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { MibModalService } from './mib-modal.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'mib-modal',
  templateUrl: 'mib-modal.component.html',
  styleUrls: ['mib-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MibModalComponent implements OnInit, OnDestroy {
  // Конфигурация
  @Input() id: string;
  @Input() width: string;

  // Отображение
  /**
   *
   *
   * @type {string}
   * @property title - отвечает за отображаемое название модального окна
   */
  @Input() title: string;

  private element: any;

  constructor(
    private mibModalService: MibModalService,
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    // проверка на существование id
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    if (isPlatformBrowser(this.platformId)) {
      document.body.appendChild(this.element);
    }

    // добавляет текущее окно в сервис
    this.mibModalService.add(this);
  }

  // при закрытии убирает себя из сервиса
  ngOnDestroy(): void {
    this.mibModalService.remove(this.id);
    this.element.remove();
  }

  // открывает окно
  open(): void {
    this.element.style.display = 'block';
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.add('mib-modal-open');
    }
  }

  // закрывает окно
  close(): void {
    this.element.style.display = 'none';
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('mib-modal-open');
    }
  }
}
