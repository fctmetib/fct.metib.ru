import {NgModule} from "@angular/core";
import {ElementInViewDirective} from "./element-in-view.directive";

@NgModule({
  exports: [
    ElementInViewDirective
  ],
  declarations: [ElementInViewDirective]
})
export class ElementInViewModule {
}
