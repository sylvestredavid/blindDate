import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/storage";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {UserModel} from "../../models/user.model";
import {PublicationModel} from "../../models/publication.model";
import {PublicationService} from "../../services/publication.service";
import {ContactService} from "../../services/contact.service";
import {MessageModel} from "../../models/message.model";
import {MessagesService} from "../../services/messages.service";
import { ConversationModel } from 'src/app/models/conversation.model';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  userId: string;
  user: UserModel;
  isCurentUserProfil: boolean;
  editDescr: boolean;
  newDescr: string;
  mur: any[]
  showPopupEditProfilImg: boolean;
  newImgProfilLien: string;
  showImg: boolean;
  imgToSee: PublicationModel;
  seeAllImg: boolean;
  loading: any;
  lottieConfig: any;
  photos: PublicationModel[];
  showConversation: boolean;
  conversation: ConversationModel

  constructor(private storage: AngularFireStorage, private route: ActivatedRoute, private userService: UserService,
              private publicationService: PublicationService, private contactService: ContactService, private messageService: MessagesService) {
  }

  ngOnInit() {
    this.loading = false
    this.lottieConfig = {
      path: 'assets/animations/spinner.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };
    this.editDescr = false;
    this.showPopupEditProfilImg = false;
    this.userId = this.route.snapshot.params.userId
    this.userService.curentUser$.subscribe(
      user => {
        if (user && this.userId === user._id) {
          this.isCurentUserProfil = true;
          this.user = user;
          this.newDescr = this.user.profil.description;
          this.photos = this.user.publications.filter(p => p.lienPhoto)
          this.initMur()
        } else {
          this.contactService.listContacts$.subscribe(
            contacts => {
              this.isCurentUserProfil = false;
              this.user = contacts.find(contact => contact._id === this.userId);
              this.initConversation()
              this.newDescr = this.user.profil.description
              this.photos = this.user.publications.filter(p => p.lienPhoto)
              this.initMur()
            }
          )
        }
      }
    )
  }

  uploadProfilFile(event) {
    this.loading = true
    const file = event.target.files[0];
    const filePath = 'user_' + this.userId + '/' + file.name;
    this.storage.upload(filePath, file).then(
      res => {
        const ref = this.storage.ref(res.metadata.fullPath);
        ref.getDownloadURL().subscribe(url => {
            console.log(url);
            this.newImgProfilLien = url
            this.loading = false;
          }
        );
      }
    )
  }

  getAge() {
    const now = new Date;
    const diff = Math.abs(now.getTime() - new Date(this.user.profil.dateDeNaissance).getTime());
    return Math.floor(diff / (1000 * 3600 * 24 * 365.25))
  }

  closeEditDescr() {
    this.editDescr = false;
    this.newDescr = this.user.profil.description
  }

  onUpdateDescr() {
    this.user.profil.description = this.newDescr
    this.editDescr = false;
    this.userService.updateUser(this.user).subscribe()
  }

  private initMur() {
    this.mur = [...this.user.publications];
    this.mur = this.mur.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    console.log(this.mur)

  }

  closeEditImgProfil() {
    this.newImgProfilLien = null;
    this.showPopupEditProfilImg = false;
  }

  onSendNewImgProfil() {
    this.user.profil.lienPhoto = this.newImgProfilLien;
    this.userService.updateUser(this.user).subscribe(
      (user) => {
        this.userService.updateCurentUser(user)
        this.showPopupEditProfilImg = false
      }
    )
  }

  seeImg(photo: PublicationModel) {
    this.imgToSee = photo;
    this.showImg = true
  }

  toggleLike(post: any) {
    const index = post.likes.findIndex(like => like === this.user._id);
    console.log(index)
    if (index !== -1) {
      post.likes.splice(index, 1);
    } else {
      post.likes.push(this.user._id)
    }
    this.publicationService.updatePublication(post).subscribe()
  }


  onDeletePostPopup(post: any) {
    const i = this.user.publications.findIndex(p => p._id === post._id)
    this.user.publications.splice(i, 1)
    this.userService.updateUser(this.user).subscribe(
      (user) => {
        this.userService.updateCurentUser(user)
        this.publicationService.deletePublication(post._id)
      }
    )
    this.showImg = false
  }


  onEditPost(post: any) {
    this.publicationService.updatePublication(post).subscribe(
      (post: PublicationModel) => {
        const i = this.user.publications.findIndex(p => p._id === post._id)
        this.user.publications[i] = post
        this.userService.updateUser(this.user).subscribe(
          (user) => {
            this.userService.updateCurentUser(user)
          }
        )
      }
    )
  }

  private initConversation() {
    this.messageService.listMessages$.subscribe(
      messages => {
        this.conversation = {}
        this.conversation.contact = this.user;
        if(messages) {
          this.conversation.messages = messages.filter(m => m.userFrom === this.userId || m.userTo === this.userId)
        }
      }
    )
  }
}
