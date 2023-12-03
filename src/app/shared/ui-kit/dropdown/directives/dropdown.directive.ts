import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {DropdownComponent} from '../dropdown.component';
import {DropdownService} from '../services/dropdown.service';

@Directive({
  selector: '[mibDropdownTrigger]'
})
export class DropdownDirective {

  @Input('mibDropdownTrigger') menu: DropdownComponent;

  constructor(
    private elRef: ElementRef,
    private menuService: DropdownService
  ) {}

  @HostListener('click', ['$event'])
  onClick($event: any) {
    $event.stopPropagation()
    this.menuService.toggleMenu(this.menu, this.elRef.nativeElement);
  }
}
