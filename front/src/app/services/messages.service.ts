import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {MessageModel} from "../models/message.model";
import {NotificationModel} from "../models/notification.model";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private listMessages: MessageModel[];

  listMessages$: BehaviorSubject<MessageModel[]> = new BehaviorSubject(this.listMessages);
  constructor(private http: HttpClient) { }

  getMessages(userId) {
    this.http.get<MessageModel[]>('http://localhost:3000/messages/user/'+ userId).subscribe(
      messages => {
        console.log(messages)
        this.listMessages = messages;
        this.listMessages$.next(this.listMessages);
      }
    )
  }

  sendMessage(message: MessageModel) {
    return this.http.post<MessageModel>('http://localhost:3000/messages/add', message)
  }

  deleteMessage(message: MessageModel) {
    return this.http.delete<MessageModel>('http://localhost:3000/messages/' + message._id)
  }

  updateMessage(message: MessageModel) {
    return this.http.put<MessageModel>('http://localhost:3000/messages/' + message._id, message)
  }

  pushMessage(newMessage: MessageModel) {
    let dejaExistant = false;
    this.listMessages.forEach(
      message => {
        if (message._id === newMessage._id) {
          dejaExistant = true;
          return;
        }
      }
    );
    if (!dejaExistant) {
      this.listMessages.push(newMessage);
      this.listMessages$.next(this.listMessages);
    }
  }

  spliceMessage(messageId: string) {
    const index = this.listMessages.findIndex(message => {
      if (message._id === messageId) {
        return true;
      }
    });
    if(index !== -1) {
      this.listMessages.splice(index, 1);
      this.listMessages$.next(this.listMessages);
    }
  }

  replaceMessage(newMessage: MessageModel) {
    const index = this.listMessages.findIndex(message => {
      if (message._id === newMessage._id) {
        return true;
      }
    });
    if(index !== -1) {
      this.listMessages[index] = newMessage;
      this.listMessages$.next(this.listMessages);
    }
  }
}
