import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {UserModel} from "../models/user.model";
import {PublicationModel} from "../models/publication.model";

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  // private listPosts: PublicationModel[];
  //
  // listPosts$: BehaviorSubject<PublicationModel[]> = new BehaviorSubject(this.listPosts);
  constructor(private http: HttpClient) { }

  // getPosts() {
  //   this.http.get<PublicationModel[]>('').subscribe(
  //     posts => {
  //       this.listPosts = posts;
  //       this.listPosts$.next(this.listPosts);
  //     }
  //   )
  // }

  createPublication(publication: PublicationModel) {
    return this.http.post('http://localhost:3000/publications/add', publication)
  }

  updatePublication(publication: PublicationModel) {
    return this.http.put('http://localhost:3000/publications/' + publication._id, publication)
  }

  deletePublication(publicationId: string) {
    return this.http.delete('http://localhost:3000/publications/' + publicationId)
  }

  // pushPost(newPost: PublicationModel) {
  //   let dejaExistant = false;
  //   this.listPosts.forEach(
  //     post => {
  //       if (post._id === newPost._id) {
  //         dejaExistant = true;
  //         return;
  //       }
  //     }
  //   );
  //   if (!dejaExistant) {
  //     this.listPosts.push(newPost);
  //     this.listPosts$.next(this.listPosts);
  //   }
  // }
  //
  // replacePost(newPost: PublicationModel) {
  //   const index = this.listPosts.findIndex(posts => {
  //     if (posts._id === newPost._id) {
  //       return true;
  //     }
  //   });
  //   this.listPosts[index] = newPost;
  //   this.listPosts$.next(this.listPosts);
  // }
  //
  // removePost(_id: string) {
  //   const index = this.listPosts.findIndex(post => {
  //     if (post._id === _id) {
  //       return true;
  //     }
  //   });
  //   this.listPosts.splice(index, 1);
  //   this.listPosts$.next(this.listPosts);
  // }
}
