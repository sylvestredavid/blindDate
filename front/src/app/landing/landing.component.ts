import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  showInscription: boolean;
  showConnexion: boolean;
  innerWidth: number;

  constructor() { }

  ngOnInit() {
    this.showInscription = false
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth)
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth)
  }
}
