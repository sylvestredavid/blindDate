import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../../services/user.service";
import {SocketService} from 'src/app/services/socket.service';
import {TchatALaveugleService} from 'src/app/services/tchat-a-laveugle.service';
import {UserModel} from "../../models/user.model";
import {ConversationModel} from 'src/app/models/conversation.model';
import {MessageModel} from 'src/app/models/message.model';

@Component({
  selector: 'app-tchat-aveugle',
  templateUrl: './tchat-aveugle.component.html',
  styleUrls: ['./tchat-aveugle.component.css']
})
export class TchatAveugleComponent implements OnInit {

  @Input() curentUser: UserModel
  @Output() close = new EventEmitter()
  tchatAveugle: ConversationModel
  newMessage: string;
  recherche: boolean

  constructor(private userService: UserService, private socketService: SocketService, private tchatAveugleService: TchatALaveugleService) {
  }

  ngOnInit() {
    this.recherche = true
    this.tchatAveugleService.listUserAttente$.subscribe(
      listUserAttente => {
        if(this.recherche) {
          listUserAttente.forEach(
            user => {
              if (!this.tchatAveugle) {
                if (user._id !== this.curentUser._id) {
                  // if(!this.curentUser.contacts.includes(user._id)) {
                  if (user.profil.sexe === this.curentUser.recherche.sexe) {
                    this.curentUser.listeAttentTchat = false;
                    this.userService.updateUser(this.curentUser).subscribe()
                    this.tchatAveugleService.removeUserAttente(this.curentUser._id)
                    this.socketService.removeUserTchatAveugle(this.curentUser._id)
                    this.tchatAveugle = {
                      contact: user,
                      messages: []
                    }
                    this.socketService.newTchatAveugle({contact: this.curentUser, messages: []}, user._id)
                  }
                  // }
                }
              }
            }
          )
          this.recherche = false
        }
      }
    )
    this.initSockets()
  }

  onClose() {
    this.curentUser.listeAttentTchat = false;
    this.userService.updateUser(this.curentUser).subscribe(
      () => this.close.emit()
    )
  }

  getUser(userFrom: string) {
    return userFrom === this.curentUser._id ? this.curentUser : this.tchatAveugle.contact
  }

  onSendMessage() {
    const message = {
      userFrom: this.curentUser._id,
      userTo: this.tchatAveugle.contact._id,
      date: new Date(),
      vu: false,
      message: this.newMessage
    }
    this.tchatAveugle.messages.push(message);
    this.socketService.sendMessageTchatAveugle(message)
    this.newMessage = ''

  }

  getImg(userFrom: any) {
    const user = userFrom === this.curentUser._id ? this.curentUser : this.tchatAveugle.contact
    return user.profil.sexe === 'Homme' ? 'assets/img/anonymeM.png' : 'assets/img/anonymeF.png'
  }

  private initSockets() {
    this.socketService.getsendMessageTchatAveugle().subscribe(
      (data: any) => {
        if (this.tchatAveugle && this.curentUser._id === data.message.userTo) {
          this.tchatAveugle.messages.push(data.message)
        }
      }
    )
    this.socketService.getnewTchatAveugle().subscribe(
      (data: any) => {
        if (!this.tchatAveugle && this.curentUser._id === data.userId) {
          this.tchatAveugle = data.tchatAveugle
          this.curentUser.listeAttentTchat = false;
          this.userService.updateUser(this.curentUser).subscribe()
          this.tchatAveugleService.removeUserAttente(this.curentUser._id)
          this.socketService.removeUserTchatAveugle(this.curentUser._id)
        }
      }
    )
    this.socketService.getRemoveUserTchatAveugle().subscribe(
      (data: any) => {
        this.tchatAveugleService.removeUserAttente(data.userId)
      }
    )
  }
}
