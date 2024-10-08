import {ElementRef, Injectable} from '@angular/core';
import {DropdownComponent} from '../dropdown.component';

@Injectable()
export class DropdownService {
  private isMenuOpen = false;
  private currentMenu: DropdownComponent | null = null;

  isMenuOpened(id: string) {
    return this.isMenuOpen && this.currentMenu.id === id;
  }

  toggleMenu(menu: DropdownComponent, trigger: HTMLElement) {
    this.isMenuOpen = this.currentMenu?.id !== menu?.id || !this.isMenuOpen;

    if (this.isMenuOpen) {
      if (this.currentMenu && this.currentMenu?.id !== menu?.id) {
        this.currentMenu.close();
      }
      this.currentMenu = menu;
      menu.toggle(trigger);
    } else {
      menu.close();
    }
  }

  closeMenu() {
    if (this.currentMenu) {
      this.currentMenu.close();
    }
    this.isMenuOpen = false;
  }

}
