import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserModel} from "../../models/user.model";
import {AngularFireStorage} from "@angular/fire/storage";
import {ContactService} from "../../services/contact.service";
import {SocketService} from "../../services/socket.service";
import {PublicationModel} from "../../models/publication.model";
import {PublicationService} from "../../services/publication.service";
import {NotificationService} from "../../services/notification.service";
import {NotificationModel} from "../../models/notification.model";

@Component({
  selector: 'app-mur',
  templateUrl: './mur.component.html',
  styleUrls: ['./mur.component.css']
})
export class MurComponent implements OnInit {
  editNewPost: boolean;
  @Input() mur: any[]
  @Input() isCurentUserMur: boolean
  newPost: PublicationModel;
  curentUser: UserModel;
  listeContacts: UserModel[]
  loading: boolean;
  lottieConfig: any;

  constructor(private publicationService: PublicationService, private userService: UserService, private notificationService: NotificationService,
              private storage: AngularFireStorage, private contactService: ContactService, private socketService: SocketService) {
  }

  ngOnInit() {
    this.loading = false
    this.lottieConfig = {
      path: 'assets/animations/spinner.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };
    this.userService.curentUser$.subscribe(
      user => {
        this.curentUser = user;
        this.initNewPost()
      }
    )
    this.contactService.listContacts$.subscribe(
      contacts => this.listeContacts = contacts
    )
    this.initSockets()
  }

  openEditNewPost() {
    if (!this.editNewPost) this.editNewPost = true
  }

  closeEditNewPost() {
    setTimeout(() => {
      this.editNewPost = false;
      this.initNewPost();
    }, 5)
  }

  private initNewPost() {
    this.newPost = {
      userId: this.curentUser._id,
      date: new Date
    }
  }

  onSendNewPost() {
    this.publicationService.createPublication(this.newPost).subscribe(
      post => {
        if (!this.curentUser.publications) {
          this.curentUser.publications = []
        }
        this.curentUser.publications.push(post)
        this.userService.updateUser(this.curentUser).subscribe(
          (user) => {
            console.log(user)
            this.userService.updateCurentUser(user)
            this.closeEditNewPost()
          }
        )
      }
    )
  }

  onDeletePost(post: any) {
    const i = this.curentUser.publications.findIndex(p => p._id === post._id)
    this.curentUser.publications.splice(i, 1)
    this.userService.updateUser(this.curentUser).subscribe(
      (user) => {
        this.userService.updateCurentUser(user)
        this.publicationService.deletePublication(post._id)
      }
    )
  }

  onEditPost(post: any) {
    this.publicationService.updatePublication(post).subscribe(
      (photo: PublicationModel) => {
        const i = this.curentUser.publications.findIndex(p => p._id === photo._id)
        this.curentUser.publications[i] = photo
        this.userService.updateUser(this.curentUser).subscribe(
          (user) => {
            this.userService.updateCurentUser(user)
          }
        )
      }
    )
  }

  toggleLike(post: any) {
    const index = post.likes.findIndex(like => like === this.curentUser._id);
    console.log(index)
    if (index !== -1) {
      post.likes.splice(index, 1);
    } else {
      post.likes.push(this.curentUser._id)
    }
    this.publicationService.updatePublication(post).subscribe(
        () => {
          if(post.userId !== this.curentUser._id) {
            let notification: NotificationModel = {
              date: new Date(),
              message: `${this.curentUser.username} aime votre publication.`,
              postId: post._id,
              userId: post.userId,
              userFrom: this.curentUser._id,
              vu: false,
            }
            if(post.lienPhoto) {
              notification.lienPhoto = post.lienPhoto
            }
            this.notificationService.addNotifications(notification).subscribe(
              notification => this.socketService.ajoutNotification(notification)
            )
          }
        }
    )
  }

  uploadFile(event) {
    this.loading = true
    const file = event.target.files[0];
    const filePath = 'user_' + this.curentUser._id + '/' + file.name;
    const task = this.storage.upload(filePath, file).then(
      res => {
        console.log(res.metadata.fullPath)
        const ref = this.storage.ref(res.metadata.fullPath);
        ref.getDownloadURL().subscribe(url => {
            console.log(url);
            this.newPost.lienPhoto = url;
            this.loading = false
          }
        );
      }
    )
  }

  isCurentUserPost(userId: string) {
    return this.curentUser._id === userId
  }

  getUser(userId: any) {
    if (this.isCurentUserPost(userId)) {
      return this.curentUser
    } else {
      if (this.listeContacts) {
        return this.listeContacts.find(contact => contact._id === userId)
      }
    }
  }

  private initSockets() {

  }
}
