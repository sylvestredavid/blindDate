import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserModel} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import * as jwt_decode from 'jwt-decode';
import {Router} from "@angular/router";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  step: number;
  userToCreate: UserModel
  password: string;
  confirmPassword: string;
  jourNaissance: string;
  moisNaissance: string;
  anneeNaissance: string;
  joursList: string[];
  moisList: string[];
  anneesList: string[];
  @Output() closePopup = new EventEmitter()
  confirmPasswordError: string;
  passwordError: string;
  emailError: string;
  usernameError: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  villeError: string;
  sexeError: string;
  rechercheError: string;
  naissanceError: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.anneeNaissance = 'AAAA';
    this.jourNaissance = "JJ";
    this.moisNaissance = 'MM';
    this.initJoursList();
    this.initMoisList();
    this.initAnneesList();
    this.step = 1;
    this.userToCreate = {
      profil: {localisation: {}, description: 'Pas de description.'},
      recherche: {},
      smacks: 0
    }
  }

  onChangeSexeProfil(sexe: string) {
    this.userToCreate.profil.sexe = sexe
  }

  onChangeSexeRecherche(sexe: string) {
    this.userToCreate.recherche.sexe = sexe

  }

  onCheckAndGoNext() {
    this.userService.existByEmail(this.userToCreate.email).subscribe(
      (resEmail: any) => {
        const emailExist = resEmail.emailExist
        this.userService.existByName(this.userToCreate.username).subscribe(
          (resUsername: any) => {
            const usernameExist = resUsername.usernameExist
            if(this.password && this.confirmPassword && this.password === this.confirmPassword && this.userToCreate.email && this.userToCreate.username && !emailExist && !usernameExist) {
              this.userToCreate.password = this.password;
              this.step = 2
            } else {
              this.emailError = this.usernameError = this.confirmPasswordError = this.passwordError = ''
              if(!this.password) {
                this.passwordError = 'Merci d\'indiquer un mot de passe'
              }
              if(!this.confirmPassword) {
                this.confirmPasswordError = 'Merci de confirmer votre mot de passe'
              }
              if(this.password !== this.confirmPassword) {
                this.confirmPasswordError = 'Les 2 mots de passe ne sont pas identiques'
              }
              if(!this.userToCreate.email) {
                this.emailError = 'Merci d\' indiquer une email'
              }
              if(!this.userToCreate.username) {
                this.usernameError = 'Merci d\' indiquer un username'
              }
              if(emailExist) {
                this.emailError = 'Un compte existe déjà avec cet email'
              }
              if(usernameExist) {
                this.usernameError = 'Ce pseudo est déjà pris'
              }
            }
          }
        )
      }
    )
  }

  getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
          this.userToCreate.profil.localisation.longitude = position.coords.longitude;
          this.userToCreate.profil.localisation.latitude = position.coords.latitude;

          this.userService.geolocation(this.userToCreate.profil.localisation.latitude, this.userToCreate.profil.localisation.longitude).subscribe(
            g => {
              this.userToCreate.profil.localisation.ville = g[0].nom;
            }
          )
        })
    }
  }

  onSubmit() {
    if(this.userToCreate.profil.localisation.ville && this.userToCreate.profil.sexe && this.userToCreate.recherche.sexe &&
      this.jourNaissance !== 'JJ' && this.moisNaissance !== 'MM' && this.anneeNaissance !== 'AAAA') {
      if(!this.userToCreate.profil.localisation.latitude) {
        this.userService.getCoordonnees(this.userToCreate.profil.localisation.ville).subscribe(
          (c: any) => {
            this.userToCreate.profil.localisation.latitude = c.results[0].geometry.location.lat;
            this.userToCreate.profil.localisation.longitude = c.results[0].geometry.location.lng;
            this.validateFormAndSubmit()
          }
        )
      } else {
        this.validateFormAndSubmit()
      }
    } else {
      this.villeError = this.sexeError = this.rechercheError = this.naissanceError = ''
      if(!this.userToCreate.profil.localisation.ville) {
        this.villeError = 'Merci d\'indiquer votre position'
      }
      if(!this.userToCreate.profil.sexe) {
        this.sexeError = 'Merci de choisir une option'
      }
      if(!this.userToCreate.recherche.sexe) {
        this.rechercheError = 'Merci de choisir une option'
      }
      if(this.jourNaissance === 'JJ' || this.moisNaissance === 'MM' || this.anneeNaissance === 'AAAA') {
        this.naissanceError = 'Merci d\'indiquer votre date de naissance'
      }
    }
  }

  private initJoursList() {
    this.joursList = [];
    for(let i = 1; i <= 31; i++) {
      if(i < 10) {
        this.joursList.push('0'+i);
      } else {
        this.joursList.push(''+i)
      }
    }
  }

  private initMoisList() {
    this.moisList = [];
    for(let i = 1; i <= 12; i++) {
      if(i < 10) {
        this.moisList.push('0'+i);
      } else {
        this.moisList.push(''+i)
      }
    }
  }

  private initAnneesList() {
    this.anneesList = [];
    const now = new Date()
    for(let i = now.getFullYear(); i >= now.getFullYear() - 100; i--) {
      this.anneesList.push(''+i)
    }
  }

  private validateFormAndSubmit() {
        this.userToCreate.profil.dateDeNaissance = new Date(+this.anneeNaissance, +this.moisNaissance - 1, +this.jourNaissance)
        this.userToCreate.profil.lienPhoto = this.userToCreate.profil.sexe === 'Homme'? 'assets/img/anonymeM.png' : 'assets/img/anonymeF.png'
        this.userService.createUser(this.userToCreate).subscribe(
          (res: any) => {
            const user = jwt_decode(res.token);
            this.userService.updateCurentUser(user)
            sessionStorage.setItem('token', res.token)
            this.router.navigate(['core/profil/' + user._id])
          },
        )
  }

  close() {
    this.closePopup.emit()
  }
}
