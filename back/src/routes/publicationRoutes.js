import {
    addPublication,
    getPostsByUserId,
    updatePost,
    deletePost,
} from '../controllers/publicationController'
import {loginRequired} from '../controllers/userController'

export const publicationRoutes = (app) => {
    app.route('/publications/add')
        .post(loginRequired, addPublication)

    app.route('/publications/:publicationId')
        .put(loginRequired, updatePost)
        .delete(loginRequired, deletePost)

    // app.route('/publications/user/:userId')
    //     .get(loginRequired, getPostsByUserId)
}
