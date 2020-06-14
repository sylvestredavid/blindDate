import {Injectable} from '@angular/core';
import io from 'socket.io-client';
import {Observable} from "rxjs";

/**
 * service d'envoi et de reception des sockets au serveur node
 */
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url ;
  private socket;

  constructor() {
    // connexion au serveur
    this.url = 'http://localhost:8081/';
    this.socket = io(this.url);
  }

  public ajoutNotification(notification) { // envoi au serveur l'ajout d'un produit
    this.socket.emit('ajout-notification', notification);
  }

  public getAjoutNotification = () => { // reception de l'ajout d'un produit (ce que le serveur node a renvoyé)
    return new Observable((observer) => {
      this.socket.on('nouvelle-notification', (data) => {
        observer.next(data);
      });
    });
  }

  public sendMessage(message) { // envoi au serveur l'ajout d'un produit
    this.socket.emit('send-message', message);
  }

  public getSendMessage = () => { // reception de l'ajout d'un produit (ce que le serveur node a renvoyé)
    return new Observable((observer) => {
      this.socket.on('nouveau-message', (data) => {
        observer.next(data);
      });
    });
  }

  public connexion(user) { // envoi au serveur l'ajout d'un produit
    this.socket.emit('connection-contact', user);
  }

  public getConnexion = () => { // reception de l'ajout d'un produit (ce que le serveur node a renvoyé)
    return new Observable((observer) => {
      this.socket.on('contact-connecter', (data) => {
        observer.next(data);
      });
    });
  }

  addToListeAttente(user: Object) {
    this.socket.emit('add-listeAttente', user);
  }

  public getaddToListeAttente = () => { // reception de l'ajout d'un produit (ce que le serveur node a renvoyé)
    return new Observable((observer) => {
      this.socket.on('nouveau-user-listeAttente', (data) => {
        observer.next(data);
      });
    });
  }

  sendMessageTchatAveugle(message: Object) {
    this.socket.emit('send-message-tchat-aveugle', message);
  }

  public getsendMessageTchatAveugle = () => { // reception de l'ajout d'un produit (ce que le serveur node a renvoyé)
    return new Observable((observer) => {
      this.socket.on('nouveau-message-tchat-aveugle', (data) => {
        observer.next(data);
      });
    });
  }

  newTchatAveugle(tchatAveugle: Object, userId: string) {
    this.socket.emit('nouveau-tchat-aveugle', {tchatAveugle: tchatAveugle, userId: userId});
  }

  public getnewTchatAveugle = () => { // reception de l'ajout d'un produit (ce que le serveur node a renvoyé)
    return new Observable((observer) => {
      this.socket.on('commencer-tchat-aveugle', (data) => {
        observer.next(data);
      });
    });
  }

  removeUserTchatAveugle(userId: string) {
    this.socket.emit('remove-user-tchat-aveugle', {userId: userId});
  }

  public getRemoveUserTchatAveugle = () => { // reception de l'ajout d'un produit (ce que le serveur node a renvoyé)
    return new Observable((observer) => {
      this.socket.on('user-supprime-tchat-aveugle', (data) => {
        observer.next(data);
      });
    });
  }
}

