import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserModel} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import * as jwt_decode from 'jwt-decode';
import {Router} from "@angular/router";
import {ContactService} from "../../services/contact.service";
import {NotificationService} from "../../services/notification.service";
import {MessagesService} from "../../services/messages.service";
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  password: string;
  email: string;
  @Output() closePopup = new EventEmitter()
  error: string;
  showPassword: boolean;

  constructor(private userService: UserService, private router: Router, private contactService: ContactService,
              private notificationService: NotificationService, private messageService: MessagesService,
              private socketService: SocketService) { }

  ngOnInit() {
  }

  onSubmit() {
    const body = {
      email: this.email,
      password: this.password
    }
    this.userService.connexion(body).subscribe(
      (res: any) => {
        const user = jwt_decode(res.token);
        console.log(user)
        this.contactService.getContacts(user._id)
        this.notificationService.getNotifications(user._id)
        this.messageService.getMessages(user._id)
        user.connected = true;
        this.userService.updateUser(user).subscribe(
          () => this.socketService.connexion(user)
        )
        this.userService.updateCurentUser(user)
        sessionStorage.setItem('token', res.token);
        this.router.navigate(['core'])
      },
      err => this.error = err.error.message
    )
  }

  close() {
    this.closePopup.emit()
  }

}
