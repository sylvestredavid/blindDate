import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private curentUser: UserModel;
  curentUser$: BehaviorSubject<UserModel> = new BehaviorSubject(this.curentUser)

  constructor(private http: HttpClient) { }

  createUser(user) {
    return this.http.post('http://localhost:3000/users/register', user)
  }

  updateUser(user: UserModel) {
    return this.http.put('http://localhost:3000/users/' + user._id, user)
  }

  connexion(body) {
    return this.http.post('http://localhost:3000/users/signIn', body)
  }

  existByEmail(email) {
    return this.http.get('http://localhost:3000/users/existByEmail/'+email)
  }

  existByName(username) {
    return this.http.get('http://localhost:3000/users/existByName/'+username)
  }

  getUserById(id) {
    return this.http.get('http://localhost:3000/users/'+id)
  }


  geolocation(lat: number, long: number): Observable<any>{
    return this.http.get<any>(`https://geo.api.gouv.fr/communes?lat=${lat}&lon=${long}&fields=nom`)
  }

  getCoordonnees(ville: string) {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + ville + '&key=AIzaSyDQ2Ey5s9dNUauYOpyWW7dNo-XpACkpE34')
  }

  updateCurentUser(user: UserModel) {
    this.curentUser = user;
    this.curentUser$.next(this.curentUser)
  }
}
