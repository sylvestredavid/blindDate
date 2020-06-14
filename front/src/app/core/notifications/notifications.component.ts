import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NotificationService} from "../../services/notification.service";
import { NotificationModel } from 'src/app/models/notification.model';
import { ContactService } from 'src/app/services/contact.service';
import {map} from "rxjs/operators";
import { UserModel } from 'src/app/models/user.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: NotificationModel[];
  contacts: UserModel[]
  @Output() close = new EventEmitter()

  constructor(private notificationService: NotificationService, private contactService: ContactService, private router: Router) { }

  ngOnInit() {
    this.notificationService.listNotifications$.subscribe(
      notifications => {
        this.notifications = notifications;
        this.notifications = this.notifications.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        })
      }
    )
    this.contactService.listContacts$.subscribe(
      contacts => {
        this.contacts = contacts;
      }
    )
  }

  getUserPhoto(userFrom: string) {
    const user = this.contacts.find(c => c._id === userFrom)
    return user.profil.lienPhoto
  }

  goToProfil(userFrom: string, notif: NotificationModel) {
    notif.vu = true
    this.notificationService.updateNotifications(notif).subscribe(
      n => this.notificationService.replaceNotification(n)
    )
    this.close.emit()
    this.router.navigate(['core/profil/' + userFrom])
  }

  goToPost(userId: string, notif: NotificationModel) {
    notif.vu = true
    this.notificationService.updateNotifications(notif).subscribe(
      n => this.notificationService.replaceNotification(n)
    )
    this.close.emit()
    this.router.navigate(['core/profil/' + userId])
  }
}
