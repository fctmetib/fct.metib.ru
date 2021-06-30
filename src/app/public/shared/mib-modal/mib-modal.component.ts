import {
  Component,
  ViewEncapsulation,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { MibModalService } from './mib-modal.service';

@Component({
  selector: 'mib-modal',
  templateUrl: 'mib-modal.component.html',
  styleUrls: ['mib-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MibModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: any;

  constructor(
    private mibModalService: MibModalService,
    private el: ElementRef
  ) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    // проверка на существование id
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // перемещает элемент в конец страницы (перед </body>), для отображения поверх остального контента
    document.body.appendChild(this.element);

    // закрывает окно при нажатии на фон
    this.element.addEventListener('click', (el) => {
      if (el.target.className === 'mib-modal') {
        this.close();
      }
    });

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
    document.body.classList.add('mib-modal-open');
  }

  // закрывает окно
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('mib-modal-open');
  }
}
