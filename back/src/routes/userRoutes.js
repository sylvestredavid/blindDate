import {
    register,
    getUsers,
    updateUser,
    loginRequired,
    sign_in,
    getUserContacts,
    existByName,
    existByEmail, getListeAttenteTchat
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

    app.route('/users/listeAttenteTchat')
        .get(getListeAttenteTchat)

    app.route('/users/:userId')
        .put(loginRequired, updateUser)

    app.route('/users/:userId/contacts')
        .get(loginRequired, getUserContacts)
}
