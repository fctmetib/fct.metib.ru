import {Component, ElementRef, HostBinding, HostListener, Inject, Input} from '@angular/core';
import {DropdownService} from './services/dropdown.service';
import {Properties} from 'csstype';
import {ScrollService} from '../../services/scroll.service';
import {WINDOW} from '../../../core/tokens/window.token';
import {animate, style, state, transition, trigger} from '@angular/animations';

const ANIMATION_DURATION = 200;

@Component({
  selector: 'mib-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  animations: [
    trigger('dropdownAnimation', [
      state('false', style({
        opacity: 0,
        transform: 'translateY(-10px)'
      })),
      state('true', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('false <=> true', [
        animate(`${ANIMATION_DURATION}ms ease`)
      ]),
    ])
  ]
})
export class DropdownComponent {

  @HostBinding('style') style: Properties = {};
  @HostBinding('@dropdownAnimation') @HostBinding('class.dropdown-open') isVisible = false;
  @HostBinding('class.dropdown-above') isAbove = false;

  private lastTrigger: ElementRef | null = null;

  constructor(
    public menuService: DropdownService,
    private elRef: ElementRef,
    private scrollService: ScrollService,
    @Inject(WINDOW) private window: Window
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

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: HTMLElement) {
    if (this.isVisible && this.lastTrigger &&
      !this.elRef.nativeElement.contains(target) &&
      !this.lastTrigger.nativeElement.contains(target)) {
      this.menuService.closeMenu();
    }
  }

  toggle(trigger: ElementRef) {
    this.isVisible = !this.isVisible;
    this.lastTrigger = trigger; // Сохраняем последний триггер

    if (this.isVisible) {
      this.scrollService.blockScroll()
      requestAnimationFrame(() => this.positionMenu(trigger));
    } else {
      this.close();
    }
  }

  close() {
    this.scrollService.allowScroll()
    this.isVisible = false;
    this.isAbove = false;
    setTimeout(() => this.style = {}, ANIMATION_DURATION)
  }


  positionMenu(trigger: ElementRef) {
    const triggerRect = trigger.nativeElement.getBoundingClientRect();
    const menuRect = this.elRef.nativeElement.getBoundingClientRect();
    const menuStyles = this.window.getComputedStyle(this.elRef.nativeElement);

    let topStyle, widthStyle;

    // Позиционирование сверху или снизу
    const bottomSpaceAvailable = window.innerHeight - triggerRect.bottom;
    const menuHeight = menuRect.height + parseInt(menuStyles.marginTop)
    if (bottomSpaceAvailable >= menuHeight) {
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
}
