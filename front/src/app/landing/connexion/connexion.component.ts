import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserModel} from "../../models/user.model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  password: string;
  username: string;
  @Output() closePopup = new EventEmitter()
  error: string;
  showPassword: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    const body = {
      username: this.username,
      password: this.password
    }
    this.userService.connexion(body).subscribe(
      (res) => console.log(res),
      err => this.error = err.error.message
    )
  }

  close() {
    this.closePopup.emit()
  }

}
