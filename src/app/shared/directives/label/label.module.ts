import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelDirective } from '../label.directive';



@NgModule({
    declarations: [
        LabelDirective
    ],
    exports: [
        LabelDirective
    ],
    imports: [
        CommonModule
    ]
})
export class LabelModule { }
