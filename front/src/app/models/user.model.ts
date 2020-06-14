import {PublicationModel} from "./publication.model";

export interface UserModel {
  _id?: string;
  username?: string,
  password?: string,
  email?: string,
  profil?: {
    dateDeNaissance?: Date,
    description?: string,
    chosesAime?: string[],
    chosesAimePas?: string[],
    localisation?: {
      ville?: string,
      latitude?: number,
      longitude?: number
    },
    sexe?: string,
    lienPhoto?: string
  },
  contacts?: string[],
  publications?: PublicationModel[],
  smacks?: number,
  recherche?: {
    ageMin?: number,
    ageMax?: number,
    sexe?: string,
    RayonEnMetres?: number
  };
  connected?: boolean;
  listeAttentTchat?: boolean;
}
