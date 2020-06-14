import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class TchatALaveugleService {

  private listeUserAttente: UserModel[];

  listUserAttente$: BehaviorSubject<UserModel[]> = new BehaviorSubject(this.listeUserAttente);
  constructor(private http: HttpClient) { }

  getListeAttenteTchat() {
    this.http.get<UserModel[]>('http://localhost:3000/users/listeAttenteTchat').subscribe(
      contacts => {
        console.log(contacts)
        this.listeUserAttente = contacts;
        this.listUserAttente$.next(this.listeUserAttente);
      }
    )
  }

  pushUserAttent(newContact: UserModel) {
    let dejaExistant = false;
    this.listeUserAttente.forEach(
      contact => {
        if (contact._id === newContact._id) {
          dejaExistant = true;
          return;
        }
      }
    );
    if (!dejaExistant) {
      this.listeUserAttente.push(newContact);
      this.listUserAttente$.next(this.listeUserAttente);
    }
  }

  removeUserAttente(_id: string) {
    const index = this.listeUserAttente.findIndex(ontact => {
      if (ontact._id === _id) {
        return true;
      }
    });
    this.listeUserAttente.splice(index, 1);
    this.listUserAttente$.next(this.listeUserAttente);
  }
}
