import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {UserModel} from "../models/user.model";
import {NotificationModel} from "../models/notification.model";
import {NotificationService} from "../services/notification.service";
import {SocketService} from "../services/socket.service";
import {MessageModel} from "../models/message.model";
import {MessagesService} from "../services/messages.service";
import {ConversationModel} from "../models/conversation.model";
import { ContactService } from '../services/contact.service';
import {TchatALaveugleService} from "../services/tchat-a-laveugle.service";

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  curentUser: UserModel;
  activeRoute: string;
  notifications: NotificationModel[];
  showNotifications: boolean;
  nbNewNotifications: number;
  nbNewMessages: number;
  conversations: ConversationModel[]
  showConversations: boolean;
  contacts: UserModel[];
  conversationAVoir: ConversationModel;
  showConversation: boolean

  constructor(public userService: UserService, private router: Router, private notificationService: NotificationService,
              private socketService: SocketService, private messageService: MessagesService, private contactService: ContactService,
              private tchatALaveugleService: TchatALaveugleService) { }

  ngOnInit() {
    this.tchatALaveugleService.getListeAttenteTchat()
    this.notifications = []
    this.userService.curentUser$.subscribe(
      user => {
        this.curentUser = user
        this.contactService.listContacts$.subscribe(
          contacts => {
            this.contacts = contacts
            if(this.contacts)
            this.initConversations()
          }
        )
      }
    )
    this.notificationService.listNotifications$.subscribe(
      notifications => {
        console.log(notifications)
        if(notifications) {
          this.notifications = notifications
          this.nbNewNotifications = notifications.filter(n => !n.vu).length
        }
      }
    )
    this.activeRoute = ''
    this.initSockets()
  }

  navig(page: string) {
    this.router.navigate(['core/' + page]);
    this.activeRoute = page
  }

  onShowNotifications() {
    if(!this.showNotifications) {
      this.showNotifications = true
    }
  }

  private initConversations() {
    this.messageService.listMessages$.subscribe(
      messages => {
        this.conversations = []
        if(messages) {
          messages.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime()
          })
          this.nbNewMessages = messages.filter(m => m.userTo === this.curentUser._id && !m.vu).length
          messages.forEach(
            message => {
              const index = this.conversations.findIndex(c => c.contact && (c.contact._id === message.userTo || c.contact._id === message.userFrom))
              if(index !== -1) {
                this.conversations[index].messages.push(message)
              } else {
                const conversation = {
                  contact: message.userFrom !== this.curentUser._id ? this.getContact(message.userFrom) : this.getContact(message.userTo),
                  messages: [message]
                }
                this.conversations.push(conversation)
              }
            }
          )
          if(this.conversationAVoir) {
            this.conversationAVoir = this.conversations.find(c => c.contact._id === this.conversationAVoir.contact._id)
          }
        }
      }
    )
  }

  onShowConversations() {
    this.showConversations = true
  }

  private getContact(id: string) {
    return this.contacts.find(c => c._id === id)
  }

  private initSockets() {
    this.socketService.getAjoutNotification().subscribe(
      (data:any) => {
        if (data.notification.userId === this.curentUser._id) {
          this.notificationService.pushNotification(data.notification)
        }
      }
    )
    this.socketService.getSendMessage().subscribe(
      (data:any) => {
        if (data.message.userTo === this.curentUser._id) {
          this.messageService.pushMessage(data.message)
        }
      }
    )
    this.socketService.getaddToListeAttente().subscribe(
      (data: any) => {
        this.tchatALaveugleService.pushUserAttent(data.user)
      }
    )
  }

  onSeeConverstaion(c: ConversationModel) {
    this.conversationAVoir = c;
    this.showConversation = true;
    this.showConversations = false
  }
}
