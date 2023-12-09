import {Directive, HostListener, Input} from "@angular/core";

@Directive({
  selector: '[passwordHider]',
})
export class PasswordHiderDirective {
  @Input() passwordHider?: HTMLInputElement[];
  @HostListener('click') onClick() {
    if (Array.isArray(this.passwordHider)) {
      this.passwordHider.forEach(dep => {
        dep.type = dep.type === 'password' ? 'text' : 'password';
      })
    }
  }
}
