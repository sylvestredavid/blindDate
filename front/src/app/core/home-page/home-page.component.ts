import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {ContactService} from "../../services/contact.service";
import {UserModel} from "../../models/user.model";
import {SocketService} from "../../services/socket.service";
import {Router} from "@angular/router";
import { ConversationModel } from 'src/app/models/conversation.model';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  mur: any[]
  contactsConnected: UserModel[]
  contactsUnConnected: UserModel[]
  conversation: ConversationModel
  showConversation: boolean
  openTchatAveugle: boolean;
  curentUser: UserModel

  constructor(private userService: UserService, private contactService: ContactService, private router: Router,
              private messageService: MessagesService, private socketService: SocketService) { }

  ngOnInit() {
    this.userService.curentUser$.subscribe(
      user => {
        this.curentUser = user
        this.contactService.listContacts$.subscribe(
          contacts => {
            if(contacts) {
              this.contactsConnected = contacts.filter(c => c.connected);
              this.contactsConnected.sort((a, b) => {
                if(a.username < b.username) {
                  return -1
                }
                if(a.username > b.username) {
                  return 1
                }
                return 0
              })
              this.contactsUnConnected = contacts.filter(c => !c.connected);
              this.contactsUnConnected.sort((a, b) => {
                if(a.username < b.username) {
                  return -1
                }
                if(a.username > b.username) {
                  return 1
                }
                return 0
              })
              this.mur = [];
              contacts.forEach(
                contact => {
                  this.mur = [...user.publications, ...contact.publications]
                }
              )
              this.mur = this.mur.sort((a, b) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime()
              })
            }
          }
        )
      }
    )
    this.socketService.getConnexion().subscribe(
      (data: any) => {
        this.contactService.replaceContact(data.contact)
      }
    )
  }

  go(link: string) {
    this.router.navigate([link])
  }

  openTchat(contact: UserModel) {
    this.messageService.listMessages$.subscribe(
      messages => {
        this.conversation = {
          contact: contact,
          messages: messages.filter(m => m.userFrom === contact._id || m.userTo === contact._id)
        }
        this.showConversation = true
      }
    )
  }

  goTchatAveugle() {
    this.curentUser.listeAttentTchat = true;
    this.userService.updateUser(this.curentUser).subscribe(
      (user) => {
        this.socketService.addToListeAttente(user)
        this.openTchatAveugle = true
      }
    )
  }
}
