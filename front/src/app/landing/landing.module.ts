import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionComponent } from './inscription/inscription.component';
import { LandingComponent } from './landing.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { ConnexionComponent } from './connexion/connexion.component';
import {SharedModule} from "../shared/shared.module";



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
    FormsModule,
    SharedModule
  ]
})
export class LandingModule { }
