export interface PublicationModel {
  _id?: string;
  date?: Date;
  contenu?: string;
  lienPhoto?: string;
  likes?: [string];
  commentaires?: [
    {
      userId?: string;
      contenu?: string
    }
  ];
  userId?: string;
}
