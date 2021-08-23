import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

export class ExitGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(
    component: ComponentCanDeactivate
  ): Observable<boolean> | boolean {
    console.log('Can deactivate')
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
