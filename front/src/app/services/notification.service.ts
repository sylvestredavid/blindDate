import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {UserModel} from "../models/user.model";
import {NotificationModel} from "../models/notification.model";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private listNotifications: NotificationModel[];

  listNotifications$: BehaviorSubject<NotificationModel[]> = new BehaviorSubject(this.listNotifications);
  constructor(private http: HttpClient) { }

  getNotifications(userId) {
    this.http.get<NotificationModel[]>('http://localhost:3000/notifications/user/'+ userId).subscribe(
      notifications => {
        console.log(notifications)
        this.listNotifications = notifications;
        this.listNotifications$.next(this.listNotifications);
      }
    )
  }

  addNotifications(notification: NotificationModel) {
    return this.http.post<NotificationModel[]>('http://localhost:3000/notifications/add', notification)
  }

  updateNotifications(notification: NotificationModel) {
    return this.http.put<NotificationModel>('http://localhost:3000/notifications/' + notification._id, notification)
  }

  pushNotification(newNotification: NotificationModel) {
    let dejaExistant = false;
    this.listNotifications.forEach(
      notification => {
        if (notification._id === newNotification._id) {
          dejaExistant = true;
          return;
        }
      }
    );
    if (!dejaExistant) {
      this.listNotifications.push(newNotification);
      this.listNotifications$.next(this.listNotifications);
    }
  }

  replaceNotification(newNotification: NotificationModel) {
    const index = this.listNotifications.findIndex(notification => {
      if (notification._id === newNotification._id) {
        return true;
      }
    });
    if(index !== -1) {
      this.listNotifications[index] = newNotification;
      this.listNotifications$.next(this.listNotifications);
    }
  }
}
