import {loginRequired} from "../controllers/userController";
import {addMessage, deleteMessage, getMessagesByUserId} from "../controllers/messageController";

export const messageRoutes = (app) => {
    app.route('/messages/add')
        .post(loginRequired, addMessage)

    app.route('/messages/:messageId')
        .delete(loginRequired, deleteMessage)

    app.route('/messages/user/:userId')
        .get(loginRequired, getMessagesByUserId)
}
