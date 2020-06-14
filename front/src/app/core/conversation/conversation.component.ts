import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageModel} from 'src/app/models/message.model';
import {UserModel} from "../../models/user.model";
import {MessagesService} from "../../services/messages.service";
import {UserService} from "../../services/user.service";
import { ConversationModel } from 'src/app/models/conversation.model';
import {SocketService} from "../../services/socket.service";

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  @Input() conversation: ConversationModel
  @Output() close = new EventEmitter()
  curentUser: UserModel
  newMessage: MessageModel

  constructor(private messageService: MessagesService, private userService: UserService, private socketService: SocketService) {
  }

  ngOnInit() {
    this.userService.curentUser$.subscribe(
      user => {
        this.curentUser = user
        this.messagesVu()
      }
    )
    this.newMessage = {}
    this.socketService.getSendMessage().subscribe(
      () => {
        setTimeout(() => {
          this.messagesVu()
        }, 1)
      }
    )
  }

  onSendMessage() {
    this.newMessage.userFrom = this.curentUser._id;
    this.newMessage.userTo = this.conversation.contact._id;
    this.newMessage.date = new Date();
    this.newMessage.vu = false;
    this.messageService.sendMessage(this.newMessage)
      .subscribe(
        message => {
          this.newMessage.message = ''
          this.messageService.pushMessage(message)
          this.socketService.sendMessage(message)
        }
      )
  }

  getUser(userFrom: string) {
    return userFrom === this.curentUser._id ? this.curentUser : this.conversation.contact
  }

  private messagesVu() {
    this.conversation.messages.forEach(
      message => {
        if (message.userTo === this.curentUser._id && !message.vu) {
          message.vu = true;
          this.messageService.updateMessage(message).subscribe(
            newMessage => this.messageService.replaceMessage(newMessage)
          )
        }
      }
    )
  }

  onClose() {
    this.close.emit()
  }
}
