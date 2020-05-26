import {
    addPost,
    getPostsByUserId,
    updatePost,
    deletePost,
} from '../controllers/postController'
import {loginRequired} from '../controllers/userController'

export const postRoutes = (app) => {
    app.route('/posts/add')
        .post(loginRequired, addPost)

    app.route('/posts/:postId')
        .put(loginRequired, updatePost)
        .delete(loginRequired, deletePost)

    app.route('/posts/user/:userId')
        .get(loginRequired, getPostsByUserId)
}
