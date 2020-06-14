import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appTextareaAutoResize]'
})
export class TextareaAutoResizeDirective {

  private elt: HTMLTextAreaElement;
  nbRows: number;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.elt = this.elementRef.nativeElement;
  }

  @HostListener('document:keydown.enter')
  addRow() {
    this.elt.rows ++
    this.nbRows = this.elt.value.split('\n').length
  }

  @HostListener('document:keyup.backspace')
  deleteRow() {
    const nbRowsAfter = this.elt.value.split('\n').length - 1
    console.log(this.nbRows)
    console.log(nbRowsAfter)
    if(nbRowsAfter < this.nbRows) {
      this.elt.rows --
      this.nbRows --
    }
  }

}
