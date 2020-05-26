export interface UserModel {
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
  contacts?: [string],
  posts?: any[],
  photos?: any[],
  smacks?: number,
  recherche?: {
    ageMin?: number,
    ageMax?: number,
    sexe?: string,
    RayonEnMetres?: number
  }
}
