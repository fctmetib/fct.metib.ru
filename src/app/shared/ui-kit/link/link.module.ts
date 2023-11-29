import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkComponent } from './link.component';



@NgModule({
    declarations: [
        LinkComponent
    ],
    exports: [
        LinkComponent
    ],
    imports: [
        CommonModule
    ]
})
export class LinkModule { }
