import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LeftIconDirective} from './left-icon.directive';


@NgModule({
    declarations: [
        LeftIconDirective
    ],
    exports: [
        LeftIconDirective
    ],
    imports: [
        CommonModule
    ]
})
export class LeftIconModule {
}
