import {AfterViewInit, Directive, ElementRef, HostListener, Input, OnChanges, Renderer2} from '@angular/core';

@Directive({
  selector: '[appBackgroundImage]'
})
export class BackgroundImageDirective implements OnChanges {

  @Input() appBackgroundImage: string;
  private elt: HTMLElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.elt = this.elementRef.nativeElement;
  }

  ngOnChanges(): void {
    this.elt.style.background = 'url("'+this.appBackgroundImage+'") center center no-repeat';
    this.elt.style.backgroundSize = 'cover';
  }



}
