import {Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2} from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  @Output() appClickOutside = new EventEmitter()
  private elt: HTMLElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.elt = this.elementRef.nativeElement;
  }

  @HostListener('document:mouseup', ['$event'])
  addRow(e: MouseEvent) {
    if(!e.path.includes(this.elt)) {
      console.log('close')
      setTimeout(() => {
        this.appClickOutside.emit()
      }, 5)
    }
  }

}
