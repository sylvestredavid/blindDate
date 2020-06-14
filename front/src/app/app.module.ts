import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {AngularFireModule} from "@angular/fire";
import {AngularFireStorageModule} from "@angular/fire/storage";
import { SquareImageDirective } from './shared/directives/square-image.directive';
import {LottieAnimationViewModule} from "ng-lottie";

export const firebaseConfig = {
  apiKey: "AIzaSyDQ2Ey5s9dNUauYOpyWW7dNo-XpACkpE34",
  authDomain: "blinddate-278520.firebaseapp.com",
  databaseURL: "https://blinddate-278520.firebaseio.com",
  projectId: "blinddate-278520",
  storageBucket: "blinddate-278520.appspot.com",
  messagingSenderId: "969913427771",
  appId: "1:969913427771:web:4c6cac07a397a76481b91e",
  measurementId: "G-6WX1S4VSQE"
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
    LottieAnimationViewModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
