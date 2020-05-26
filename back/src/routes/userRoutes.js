import {
    register,
    getUsers,
    updateUser,
    loginRequired,
    sign_in,
    getUsertWithId,
    existByName,
    existByEmail
} from '../controllers/userController'

export const userRoutes = (app) => {
    app.route('/users')
        .get(loginRequired, getUsers)

    app.route('/users/register')
        .post(register)

    app.route('/users/signIn')
        .post(sign_in)

    app.route('/users/existByEmail/:email')
        .get(existByEmail)

    app.route('/users/existByName/:name')
        .get(existByName)

    app.route('/users/:userId')
        .get(loginRequired, getUsertWithId)
        .put(loginRequired, updateUser)
}
