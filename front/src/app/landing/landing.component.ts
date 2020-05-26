import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  showInscription: boolean;
  showConnexion: boolean;

  constructor() { }

  ngOnInit() {
    this.showInscription = false
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
}
