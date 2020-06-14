import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BackgroundImageDirective} from "./directives/background-image.directive";
import {SquareImageDirective} from "./directives/square-image.directive";
import { TimeDiffPipe } from './pipes/time-diff.pipe';
import { TextareaAutoResizeDirective } from './directives/textarea-auto-resize.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';



@NgModule({
  declarations: [
    BackgroundImageDirective,
    SquareImageDirective,
    TimeDiffPipe,
    TextareaAutoResizeDirective,
    ClickOutsideDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BackgroundImageDirective,
    SquareImageDirective,
    TimeDiffPipe,
    TextareaAutoResizeDirective,
    ClickOutsideDirective
  ]
})
export class SharedModule { }
