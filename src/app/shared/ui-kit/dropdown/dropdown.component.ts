import {Component, ElementRef, HostBinding, HostListener, Input} from '@angular/core';
import {DropdownService} from './services/dropdown.service';
import {Properties} from 'csstype';

@Component({
  selector: 'mib-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {

  @HostBinding('style') style: Properties = {};
  @HostBinding('class.dropdown-open') isVisible = false;
  @HostBinding('class.dropdown-above') isAbove = false;

  private lastTrigger: ElementRef | null = null;

  constructor(
    public menuService: DropdownService,
    private elRef: ElementRef
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  @HostListener('window:resize')
  onResize() {
    if (this.isVisible && this.lastTrigger) {
      this.positionMenu(this.lastTrigger);
    }
  }

  toggle(trigger: ElementRef) {
    this.isVisible = !this.isVisible;
    this.lastTrigger = trigger; // Сохраняем последний триггер

    if (this.isVisible) {
      setTimeout(() => this.positionMenu(trigger));
    } else {
      this.close();
    }
  }

  close() {
    this.isVisible = false;
    this.isAbove = false;  // Сбросить состояние
  }

  positionMenu(trigger: ElementRef) {
    const triggerRect = trigger.nativeElement.getBoundingClientRect();
    const menuRect = this.elRef.nativeElement.getBoundingClientRect();

    let topStyle, widthStyle;

    // Позиционирование сверху или снизу
    const bottomSpaceAvailable = window.innerHeight - triggerRect.bottom;
    if (bottomSpaceAvailable >= menuRect.height) {
      this.isAbove = false;
      topStyle = `${triggerRect.bottom}px`;
    } else {
      this.isAbove = true;
      topStyle = `${triggerRect.top - menuRect.height}px`;
    }

    // Установка ширины меню равной ширине триггера
    widthStyle = `${triggerRect.width}px`;

    // Обновление стилей
    this.style = {
      position: 'absolute',
      top: topStyle,
      width: widthStyle
    };
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: HTMLElement) {
    if (this.isVisible && this.lastTrigger &&
      !this.elRef.nativeElement.contains(target) &&
      !this.lastTrigger.nativeElement.contains(target)) {
      this.menuService.closeMenu();
    }
  }
}
