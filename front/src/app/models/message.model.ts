export interface MessageModel {
  _id?: string;
  date?: Date;
  message?: string;
  userTo?: string;
  userFrom?: string;
  vu?: Boolean;
}
