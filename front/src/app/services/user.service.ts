import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(user) {
    return this.http.post('http://localhost:3000/users/register', user)
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


  geolocation(lat: number, long: number): Observable<any>{
    return this.http.get<any>(`https://geo.api.gouv.fr/communes?lat=${lat}&lon=${long}&fields=nom`)
  }

  getCoordonnees(ville: string) {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + ville + '&key=AIzaSyB1-PInaNGwoOQdzjfIjf2MeR3Q9WHxhvU')
  }
}
