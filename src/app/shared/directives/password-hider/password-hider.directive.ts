import {Directive, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[passwordHider]',
})
export class PasswordHiderDirective {
  @Input() passwordHider?: HTMLInputElement[];

  @HostBinding('class.cursor-pointer') cursorPointer = true

  @HostListener('click') onClick() {
    if (Array.isArray(this.passwordHider)) {
      this.passwordHider.forEach(dep => {
        dep.type = dep.type === 'password' ? 'text' : 'password';
      })
    }
  }
}
