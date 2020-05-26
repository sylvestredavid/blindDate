import {loginRequired} from "../controllers/userController";
import {addPhoto, deletePhoto, getPhotoByUserId, updatePhoto} from "../controllers/photoController";

export const photoRoutes = (app) => {
    app.route('/photos/add')
        .post(loginRequired, addPhoto)

    app.route('/photos/:photoId')
        .put(loginRequired, updatePhoto)
        .delete(loginRequired, deletePhoto)

    app.route('/photos/user/:userId')
        .get(loginRequired, getPhotoByUserId)
}
