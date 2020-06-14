import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserModel} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: any
  @Output() toggleLike = new EventEmitter()
  @Output() deletePost = new EventEmitter()
  @Output() editPost = new EventEmitter()
  openMenuPost: boolean;
  @Input() isCurentUserProfil: boolean;
  @Input() user: UserModel;
  curentUserId: string;
  showDeletePopup: boolean;
  showModifPopup: boolean;
  newContenu: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.curentUser$.subscribe(
      user => this.curentUserId = user._id
    )
    this.newContenu = this.post.contenu
  }

  toggleLikeEmit(post: any) {
    this.toggleLike.emit(post)
  }

  getIfLiked(likes: string[]) {
    if(this.curentUserId)
    return likes.includes(this.curentUserId) ? 'assets/icons/heart_primary.svg' : 'assets/icons/heart.svg'
  }

  toggleMenuPost() {
    this.openMenuPost = !this.openMenuPost
  }

  onDeletePost() {
    this.deletePost.emit(this.post)
    this.showDeletePopup = false
  }

  onModifPost() {
    this.post.contenu = this.newContenu
    this.editPost.emit(this.post)
    this.showDeletePopup = false
  }

  goProfil(_id: string) {
    this.router.navigate(['core/profil/' + _id])
  }

  onShowDeletePopup() {
    this.openMenuPost = false
    this.showDeletePopup = true
  }

  onShowModifPopup() {
    this.openMenuPost = false
    this.showModifPopup = true
  }
}
