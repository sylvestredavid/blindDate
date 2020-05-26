import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionComponent } from './inscription/inscription.component';
import { LandingComponent } from './landing.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { ConnexionComponent } from './connexion/connexion.component';



@NgModule({
  declarations: [InscriptionComponent, LandingComponent, ConnexionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LandingComponent,
      }
    ]),
    FormsModule
  ]
})
export class LandingModule { }
