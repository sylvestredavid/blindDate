import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreComponent} from "./core.component";
import {RouterModule} from "@angular/router";
import {MurComponent} from './mur/mur.component';
import {ProfilComponent} from './profil/profil.component';
import {FormsModule} from "@angular/forms";
import {PostComponent} from './mur/post/post.component';
import {SharedModule} from "../shared/shared.module";
import { HomePageComponent } from './home-page/home-page.component';
import {LottieAnimationViewModule} from "ng-lottie";
import { NotificationsComponent } from './notifications/notifications.component';
import { ConversationComponent } from './conversation/conversation.component';
import { TchatAveugleComponent } from './tchat-aveugle/tchat-aveugle.component';


@NgModule({
  declarations: [
    CoreComponent,
    MurComponent,
    ProfilComponent,
    PostComponent,
    HomePageComponent,
    NotificationsComponent,
    ConversationComponent,
    TchatAveugleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CoreComponent,
        children: [
          {
            path: '',
            component: HomePageComponent
          },
          {
            path: 'profil/:userId',
            component: ProfilComponent
          }
        ]
      }
    ]),
    FormsModule,
    SharedModule,
    LottieAnimationViewModule
  ]
})
export class CoreModule {
}
