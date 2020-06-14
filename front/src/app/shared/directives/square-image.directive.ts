import {AfterViewInit, Directive, ElementRef, HostListener, OnChanges, Renderer2} from '@angular/core';

@Directive({
  selector: '[appSquareImage]'
})
export class SquareImageDirective implements AfterViewInit {

  private elt: HTMLElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.elt = this.elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.resize()
  }

  @HostListener('window:resize')
  resize() {
    this.elt.style.height = this.elt.offsetWidth + 'px'
  }



}
