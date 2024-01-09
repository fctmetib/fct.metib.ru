import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefIconComponent } from './ref-icon.component';
import {SkeletonModule} from '../skeleton/skeleton.module';



@NgModule({
    declarations: [
        RefIconComponent
    ],
    exports: [
        RefIconComponent
    ],
    imports: [
        CommonModule,
        SkeletonModule
    ]
})
export class IconModule { }
