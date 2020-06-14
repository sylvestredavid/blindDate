import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private listContacts: UserModel[];

  listContacts$: BehaviorSubject<UserModel[]> = new BehaviorSubject(this.listContacts);
  constructor(private http: HttpClient) { }

  getContacts(userId) {
    this.http.get<UserModel[]>('http://localhost:3000/users/'+ userId +'/contacts').subscribe(
      contacts => {
        this.listContacts = contacts;
        this.listContacts$.next(this.listContacts);
      }
    )
  }

  pushContact(newContact: UserModel) {
    let dejaExistant = false;
    this.listContacts.forEach(
      contact => {
        if (contact._id === newContact._id) {
          dejaExistant = true;
          return;
        }
      }
    );
    if (!dejaExistant) {
      this.listContacts.push(newContact);
      this.listContacts$.next(this.listContacts);
    }
  }

  replaceContact(newContact: UserModel) {
    const index = this.listContacts.findIndex(contact => {
      if (contact._id === newContact._id) {
        return true;
      }
    });
    if(index !== -1) {
      this.listContacts[index] = newContact;
      this.listContacts$.next(this.listContacts);
    }
  }

  removeContact(_id: string) {
    const index = this.listContacts.findIndex(ontact => {
      if (ontact._id === _id) {
        return true;
      }
    });
    this.listContacts.splice(index, 1);
    this.listContacts$.next(this.listContacts);
  }
}
